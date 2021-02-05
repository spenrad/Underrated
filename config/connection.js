const mysql = require('mysql');

// UNCOMMENT FOR LOCAL TESTING
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'password',
//   database: '',
// });

// COMMENT  OUT FOR LOCAL TESTING
// var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;