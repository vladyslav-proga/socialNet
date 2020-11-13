const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const Data = require('../util/data');

const salt = bcrypt.genSaltSync(10);

exports.signUp = async (req, res, next) => {

  let candidate;
  await User.findOneByEmail(req.body.email)
    .then(result => {
        candidate = result[0][0];
    });
  
  if (candidate) {
      //Пользователь найден, ошибка
      res.status(409).json({
        message: 'User with this email is already exists!'
      });
  } else {
      //Пользователя нету, создаем нового пользователя
      const password = req.body.password;
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = new User({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: hashedPassword
      });
      try {
        await user.save();
        res.status(201).json({
            message: 'Successfully loged'
        });
      }
      catch(err) {
        console.log(err);
      }
  }
};

exports.signIn = ( req, res, next) => {
    User.findOneByEmail(req.body.email)
        .then( result => {

            const candidate = result[0][0];
            console.log(candidate);

            if ( candidate ) {
                console.log(candidate);
                // Пользователь существует, идет проверка пароля
                const comparePasswordsResult = bcrypt.compareSync(req.body.password, candidate.password);
                if ( comparePasswordsResult ) {
                    // Пароли совпали, генерируем jwt token
                    const token = jwt.sign({
                        email: candidate.email,
                        userId: candidate.id
                    }, Data.jwt, { expiresIn: 3600});
                    res.status(200).json({
                        token: `Bearer ${token}`,
                        userId: candidate.id,
                        fName: candidate.fname,
                        lName: candidate.lname,
                        expiresIn: 3600
                    });
                } else {
                    // Пароли не совпадают, ошибка
                    res.status(401).json({
                        message: 'Invalide password'
                    });
                }

            } else {
                // Пользователя не найдено, ошибка
                res.status(404).json({
                    message: 'User with this email is not found!'
                });
            }
        });
}