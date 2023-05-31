const mysql = require('mysql2');

var connection = mysql.createConnection({
  host : 'localhost',
  database : 'LOBABOBA',
  user : 'root',
  password : 'mypassword'
});

connection.connect(function(error){
  if(error)
  {
    throw error;
  }
  else
  {
    console.log('MySQL Database is connected Successfully');
  }
});

module.exports = connection;
