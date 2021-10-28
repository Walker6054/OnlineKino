const mysql = require("mysql2");
//Подключение к БД
const connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "74hBqDDWri",
    database: "74hBqDDWri",
    password: "1vJuPtE1q3"
});
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});


module.exports = connection;