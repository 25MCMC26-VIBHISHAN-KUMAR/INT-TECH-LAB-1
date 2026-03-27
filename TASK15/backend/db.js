const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vvsn@123', // ⚠️ PUT YOUR MYSQL PASSWORD HERE
  database: 'crud_app'
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected...");
  }
});

module.exports = db;