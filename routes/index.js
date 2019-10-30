var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "rpgdb"
});

con.connect(err => {
  if (err) throw err;
  console.log("connected")
});

/* GET home page. */
router.get('/', function (req, res, next) {

  var playerSql = "SELECT * FROM players";
  var charSql = "SELECT * FROM characters"
  var playerResult;
  var charResult;

  con.query(playerSql, (err, result) => {
    if (err) throw err;
    playerResult = result;
   
  })
  con.query(charSql, (err, result) => {
    if (err) throw err;
    charResult = result;
   
  })

  res.render('index', { title: 'RPG EXAMPLE', play: playerResult, char: charResult}); 

  
});




module.exports = router;
