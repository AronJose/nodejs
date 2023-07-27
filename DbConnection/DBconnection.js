var mysql = require("mysql");

var conet = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "DemoNode"
});

conet.connect((error) => {
    if (error) throw error;
    console.log("connected !! ");
});
module.exports = conet;
