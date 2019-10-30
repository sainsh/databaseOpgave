var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/mysqlConnector')





/* GET home page. */
router.get('/', function (req, res, next) {

  var playerSql = "SELECT * FROM players";
  var charSql = "SELECT * FROM characters";

  pool.query( playerSql, function(err, resP, fieldP) {
    if (err) throw new Error(err)
    pool.query(charSql, function(err, resC, fieldC){
      if (err) throw new Error(err)
      console.log(resP)
      console.log(resC)
      res.render('index', { title: 'RPG EXAMPLE', play: resP, char: resC });
    })
  });
});




module.exports = router;
