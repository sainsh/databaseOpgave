var express = require('express');
var router = express.Router();
var mysql = require('mysql')


//get all players
router.get('/players/', function (req, res, next) {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })
    var sql = "SELECT * FROM players"

    con.query(sql, function(err, result){
        if(err) throw err

        res.send(result)
    })

      
});

//get all characters
router.get('/characters/', function (req, res, next) {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var sql = "SELECT * FROM characters"

    
    con.query(sql, function(err, result){
        if(err) throw err

        res.send(result)
    })
});


//create new player
router.post('/players/', function (req, res, next) {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var sql = "INSERT INTO players set ?"

    
    con.query(sql,req.body, function(err, result){
        if(err) throw err

        res.send(`inserted new entry into players: ${JSON.stringify(req.body)}`)
    })
});

//create new character
router.post('/characters/', function (req, res, next) {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var sql = "INSERT INTO characters set ?"

    
    con.query(sql,req.body, function(err, result){
        if(err) throw err

        res.send(`inserted into characters: ${JSON.stringify(req.body)}`)
    })
});

//update player
router.put('/players/:id', function (req, res, next) {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var sql = `update players SET PlayerName = "${req.body.PlayerName}", Age = ${req.body.Age} WHERE PlayerID = ${req.path.slice(9)}`

    con.query(sql,req.body, function(err, result){
        if(err) throw err

        res.send(`updated a row in players: ${JSON.stringify(req.body)}`)
    })
});


//update character
router.put('/characters/:id', function (req, res, next) {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var sql = `update characters
     SET CharacterName = "${req.body.CharacterName}", 
     Class = "${req.body.Class}",
     Levels = "${req.body.Levels}",
     MaxHP = ${req.body.MaxHP},
     CurrentHP = ${req.body.CurrentHP},
     PlayerID = ${req.body.PlayerID}
     WHERE CharacterID = ${req.path.slice(12)}`

    
    con.query(sql,req.body, function(err, result){
        if(err) throw err

        res.send(`updated a row in characters: ${JSON.stringify(req.body)}`)
    })
});

//delete player
router.delete('/players/:id', function (req, res, next) {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var sql = `DELETE FROM players WHERE PlayerID = ${req.path.slice(9)}`

    con.query(sql,req.body, function(err, result){
        if(err) throw err

        res.send(`deleted a row in players: ${JSON.stringify(result)}`)
    })

    sql = `SELECT PlayerID FROM players ORDER BY PlayerID desc limit 1`
    
    con.query(sql, function(err, result){
        if(err) throw err

        sql = `ALTER TABLE players AUTO_INCREMENT = ${JSON.stringify(result[0].PlayerID)}`
        con.query(sql, function(err, result){
            if(err) throw err
        })
    })
});

//delete character
router.delete('/characters/:id', function (req, res, next) {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var sql = `DELETE FROM characters
     WHERE CharacterID = ${req.path.slice(12)}`

    
    con.query(sql,req.body, function(err, result){
        if(err) throw err

        res.send(`deleted a row in characters: ${JSON.stringify(result)}`)
    })

    sql = `SELECT CharacterID FROM characters ORDER BY CharacterID desc limit 1`
    
    con.query(sql, function(err, result){
        if(err) throw err

        sql = `ALTER TABLE characters AUTO_INCREMENT = ${JSON.stringify(result[0].CharacterID)}`
        con.query(sql, function(err, result){
            if(err) throw err
        })
    })
});

//get single player
router.get('/players/:id', function (req, res, next) {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })
    var sql = "SELECT * FROM players WHERE PlayerID = ?"

    con.query(sql, req.path.slice(9), function(err, result){
        if(err) throw err

        res.send(result)
    })

      
});

//get single character
router.get('/characters/:id', function (req, res, next) {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'rpgdb',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var sql = "SELECT * FROM characters WHERE CharacterID = ?"

    
    con.query(sql, req.path.slice(12), function(err, result){
        if(err) throw err

        res.send(result)
    })
});


module.exports = router;
