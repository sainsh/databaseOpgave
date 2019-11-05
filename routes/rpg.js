var express = require('express');
var router = express.Router();
var connector = require('../databaseConnector')
var jade = require('jade')
var fs = require('fs')

router.get('/', function (req, res, next) {
    res.render('rpg', { title: "RPG TABLES" });
});

router.get('/showPlayers', function (req, res, next) {
    connector.showPlayers(function(json){
        fs.readFile('./views/table.jade', function(err, content){
            if(err) throw err

            var fn = jade.compile(content, {filename: './views/table.jade'})
            var html = fn(json)
            res.send(html)
        })
    })
})

router.get('/showCharacters', function (req, res, next) {
    connector.showCharacters(function(json){
        fs.readFile('./views/table.jade', function(err, content){
            if(err) throw err

            var fn = jade.compile(content, {filename: './views/table.jade'})
            var html = fn(json)
            res.send(html)
        })
    })
})



module.exports = router;
