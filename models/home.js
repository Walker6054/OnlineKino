const mysql = require("mysql2");
//Подключение к БД
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "onlinekinonew",
    password: "Walker.90"
});
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});


module.exports = connection;