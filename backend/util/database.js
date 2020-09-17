const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'social-node',
    password: 'petropetruk2002KPI'
});

module.exports = pool.promise();