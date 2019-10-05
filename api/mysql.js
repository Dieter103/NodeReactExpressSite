const mysql = require("mysql");

const conn = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Dieter1032525", //password of your mysql db
  database: "users"
});

const util = require("util");
conn.query = util.promisify(conn.query);

// conn.connect(function(err){
//     console.log('connected');
//     (err)? console.log(err+'+++++++++++++++//////////'): console.log('connection********');
// });

module.exports = conn;
