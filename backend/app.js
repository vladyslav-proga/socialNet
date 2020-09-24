const express = require('express');
const db = require('./util/database');
const cors = require('cors');

const app = express();

app.use(cors());

db.execute(`SELECT * FROM users`)
    .then(res => console.log(res[0]))
    .catch(err => console.log(err));


app.use('/auth', (req, res, next) => {
    res.json({name: '1'});
})

app.use((req, res, next) => {
    console.log('main')
});

app.listen(5000);