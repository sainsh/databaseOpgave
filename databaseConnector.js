const mysql = require('mysql')
var fs = require('fs')

exports.createDatabase = dbInfo => {
    initDatabase(dbInfo)
}
function initDatabase(dbInfo) {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })


    var sql = `DROP DATABASE IF EXISTS ${dbInfo}; 
    CREATE DATABASE ${dbInfo};`

    con.query(sql, function (err, result) {
        if (err) throw err
        console.log(result)
    })

    con.end()

}


exports.createTables = dbInfo => {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: dbInfo.databaseName,
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    var dropSQL = ``
    var createSQL = ``
    for (var i = 0; i < dbInfo.tables.length; i++) {
        dropSQL += `DROP TABLE IF EXISTS ${dbInfo.tables[i].tableName};`

        createSQL += `CREATE TABLE IF NOT EXISTS ${dbInfo.tables[i].tableName}(`
        for (var j = 0; j < dbInfo.tables[i].collumns.length; j++) {
            createSQL += `${dbInfo.tables[i].collumns[j]} ${dbInfo.tables[i].types[j]}`
            if (j != dbInfo.tables[i].collumns.length - 1) {
                createSQL += `, `;
            }
        }
        createSQL += `);`

    }
    con.query(dropSQL + createSQL, function (err, res, field) {
        if (err) throw new Error(err)
    })


    con.end()
}

exports.insertData = dbInfo => {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: dbInfo.databaseName,
        multipleStatements: true
    })

    con.connect(function (err) {
        if (err) throw err
        console.log("connected")
    })

    try {

        for (var i = 0; i < dbInfo.tables.length; i++) {
            var file = JSON.parse(fs.readFileSync(`./public/json/${dbInfo.tables[i].tableName}.json`))
            for (var j = 0; j < file.length; j++) {

                var sql = `INSERT INTO ${dbInfo.tables[i].tableName} set ?;`

                con.query(sql, file[j], function (err, result) { //[file] is [object Object]
                    if (err) throw new Error(err)
                })
            }
        }
    } catch (error) {
        console.error(error)
    }

    con.end()
}

exports.showPlayers = fn => {
    var con = mysql.createConnection({
        host: "localhost",
        user: 'admin',
        password: "admin",
        database: "rpgdb",
        charset: "utf8mb4",
        multipleStatements: true
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to Database: rpgdb");
    });

    var resultJSON = { titles: [], objects: [] };

    var query = "SHOW columns FROM players;";
    query += "SELECT * FROM players;";
    con.query(query, function (err, result) {
        if (err) throw err;
        for (i = 0; i < result[0].length; i++) {
            resultJSON.titles.push(result[0][i].Field);
        }
        resultJSON.objects = result[1];
        con.end();
        fn(resultJSON);
    });

}

exports.showCharacters = fn => {
    var con = mysql.createConnection({
        host: "localhost",
        user: 'admin',
        password: "admin",
        database: "rpgdb",
        charset: "utf8mb4",
        multipleStatements: true
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to Database: rpgdb");
    });

    var resultJSON = { titles: [], objects: [] };

    var query = "SHOW columns FROM characters;";
    query += "SELECT * FROM characters;";
    con.query(query, function (err, result) {
        if (err) throw err;
        for (i = 0; i < result[0].length; i++) {
            resultJSON.titles.push(result[0][i].Field);
        }
        resultJSON.objects = result[1];
        con.end();
        fn(resultJSON);
    });

}