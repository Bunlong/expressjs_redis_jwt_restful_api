var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Q1p2m3g4',
  database : 'foodie_menu'
});

module.exports = db;