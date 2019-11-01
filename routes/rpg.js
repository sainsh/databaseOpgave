var express = require('express');
var router = express.Router();
var connector = require('../databaseConnector')
var jade = require('jade')
var fs = require('fs')

router.get('/', function (req, res, next) {
    res.render('rpg', { title: "RPG TABLES" });
});

router.get('/showData', function (req, res, next) {
    connector.showData(function(json){
        fs.readFile('./views/table.jade', function(err, content){
            if(err) throw err

            var fn = jade.compile(content, {filename: './views/table.jade'})
            var html = fn(json)
            res.send(html)
        })
    })
})



module.exports = router;
