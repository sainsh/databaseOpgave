var express = require('express');
var router = express.Router();
var dbConnector = require('../databaseConnector.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var dbName = 'rpgdb';
  dbConnector.createDatabase(dbName);
  res.end();
});

router.get('/createTables', function(req, res, next){
  var dbSetup = {databaseName: 'rpgdb',
  tables: [{tableName: 'players',
    collumns: ['PlayerID', 'PlayerName', 'Age'],
    types: ['INT AUTO_INCREMENT PRIMARY KEY', 'VARCHAR(255)', 'INT']},
  {tableName: 'characters',
    collumns: ['CharacterID', 'CharacterName', 'Class', 'Levels', 'MaxHP', 'CurrentHP', 'PlayerID'],
    types: ['INT AUTO_INCREMENT PRIMARY KEY', 'VARCHAR(255)', 'VARCHAR(255)','VARCHAR(255)', 'INT', 'INT', 'INT']}]}
  dbConnector.createTables(dbSetup);
  res.end;
});

router.get('/createData', function(req, res, next){
  var dbSetup = {databaseName: 'rpgdb',
  tables: [{tableName: 'players'}, {tableName: 'characters'}]};
  dbConnector.insertData(dbSetup);
  res.end();
});

module.exports = router;