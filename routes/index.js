var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/mysqlConnector')


var con = connection.createConnection();


/* GET home page. */
router.get('/', function (req, res, next) {

  var playerSql = "SELECT * FROM players";
  var charSql = "SELECT * FROM characters";

  var playerResult = connection.query(con, playerSql);
  var charResult = connection.query(con, charSql);

  res.render('index', { title: 'RPG EXAMPLE', play: playerResult, char: charResult });

});




module.exports = router;
