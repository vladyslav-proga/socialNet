const express = require('express');
const db = require('./util/database');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/auth/signup', (req, res, next) => {
    console.log(req.body);
});

app.use((req, res, next) => {
    console.log('main')
});

app.listen(5000);