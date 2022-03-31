const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'vitor',
  password: '28183228',
  // database: 'StoreManager',
  // port: 3306,
});

// const connection = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   // port: process.env.PORT,
// }); 

module.exports = connection;
