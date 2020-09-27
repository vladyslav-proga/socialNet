const User = require('../models/users');

exports.signUp = (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const pass = req.body.password;
  console.log(fname, lname, email, pass);
  User.findOneByEmail(email)
    .then(user => {
      //checking if email is exists
      const userExist = user[0][0];
      if (userExist) {
        return res.status(201).json({ message: `This user is alredy exists` })
      }
      //saving if true
      const data = new User(
        fname,
        lname,
        email,
        pass
      ).save();
    }).catch(err => console.log(err))
};

exports.signIn = (req, res, next) => {
  console.log('log in start');
}