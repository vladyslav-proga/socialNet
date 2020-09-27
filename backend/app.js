const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./util/database')

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/auth', authRoutes);

db.execute(`select * from users`)
    .then(result => {
        console.log(result[0]);
        db.end()
        console.log('сервер выключен')
    })
    .catch(err => {
        console.log(err);
    });

app.listen(5000);