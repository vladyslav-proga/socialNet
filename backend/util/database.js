const mysql = require('mysql2');
const DATA = require('./data');


const pool = mysql.createPool({
    host: DATA.host,
    user: DATA.user,
    database: DATA.database,
    password: DATA.password
});

module.exports = pool.promise();