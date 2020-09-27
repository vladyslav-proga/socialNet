const db = require('./util/database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/users')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/auth/signup', (req, res, next) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const pass = req.body.password;
    console.log(fname, lname, email, pass)
    const user = new User(
        fname,
        lname,
        email,
        pass
    ).save();
})

db.execute(`select * from users`)
    .then(result => {
        console.log(result[0]);
    })
    .then(() => {
        console.log('Подключение закрыто')
        db.end()
    })
    .catch(err => {
        console.log(err);
    });

app.listen(5000);