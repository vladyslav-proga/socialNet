const express = require('express');
const db = require('./util/database');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: true })); 

db.execute(`SELECT * FROM users`)
    .then(res => console.log(res[0]))
    .catch(err => console.log(err));


app.use('/auth', (req, res, next) => {
    res.json({name: '1'});
})

app.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    res.status(400);
    res.json({
        error: 'This user is already exists!'
    });
    res.redirect('/signup/err');
});

app.use((req, res, next) => {
    console.log('main')
});

app.listen(5000);