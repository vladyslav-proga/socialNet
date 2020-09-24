const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7367190',
    database: 'sql7367190',
    password: 'PP9PYsdrBa'
});

module.exports = pool.promise();