const User = require('../models/users');

exports.signUp = ( req, res, next) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const pass = req.body.password;
    console.log(fname, lname, email, pass);
    const user = new User(
        fname,
        lname,
        email,
        pass
    ).save();
};

exports.signIn = ( req, res, next) => {
    console.log('log in start');
}