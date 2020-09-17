const express = require('express');
const db = require('./util/database');

const app = express();

db.execute('SELECT * FROM users')
    .then(result => {
        console.log(result[0]);
    })
    .catch(err => {
        console.log(err);
    });

app.use((req, res, next) => {
    
});

app.listen(6000);