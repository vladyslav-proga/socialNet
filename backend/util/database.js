const mysql = require('mysql2');
const DATA = require('./data');


const pool = mysql.createPool({
    host: DATA.data.host,
    user: DATA.data.user,
    database: DATA.data.database,
    password: DATA.data.password
});

module.exports = pool.promise();