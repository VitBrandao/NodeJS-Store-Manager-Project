const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'vitor',
  password: '28183218',
  database: 'StoreManager',
});

module.exports = connection;