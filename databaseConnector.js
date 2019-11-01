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
    console.log("drop: " + dropSQL)
    console.log("create: " + createSQL)
    con.query(dropSQL + createSQL, function (err, res, field) {
        if (err) throw new Error(err)
        console.log(res)
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


            var Sql = `INSERT INTO ${dbInfo.tables[i].tableName} set ?`


            con.query(Sql, [file], function (err, result) {
                if (err) throw new Error(err)
                console.log(`Inserted ${result.affectedRows}`);
            })

        }
    } catch (error) {
        console.error(error)
    }

    con.end()
}

exports.showData = fn => {
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


    var resultJson = { tables: [{ players: [] }, { characters: [] }] }
    var sql = "SELECT * FROM players"
    con.query(sql, function (err, result) {
        if (err) throw err
        resultJson.tables.push(result)

        sql = "SELECT * FROM characters"

        con.query(sql, function (err, result) {
            if (err) throw err
            resultJson.tables.push(result)
            con.end()
            fn(resultJson)
        })
    })




}