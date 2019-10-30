const mysql = require('mysql')


exports.createConnection = () => {

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

    return con;


}



exports.query = async (con, sql) => {
    var res;

   await con.query(sql, (err, result) => {
        if (err) throw err;
        
        res = result;
        console.log(res)
        return res;
    })
    
}
