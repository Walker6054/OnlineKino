const path = require('path');
const pathDir = path.dirname(__dirname);

exports.index = function (request, response) {
    //console.log(request);
    response.sendFile(pathDir + '/views/main.html');
};
exports.admin = function (request, response) {
    response.sendFile(pathDir + '/views/adminPanel.html');
};

exports.films = function (request, response) {
    let page = request.url.split('?')[1] - 1;

    let pageFilms = new Array();
    if (page > maxPage-1) {
        page = maxPage;
    }

    for (let i = 9 * page; i < 9 * page + 9; i++){
        if (films[i] != undefined) {

            pageFilms[i % 9] = films[i];
        }
    }
	response.send(pageFilms);
};

exports.maxpage = function (request, response) {
    let url = request.url;
	response.send(url+'|'+maxPage);
};




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


var maxPage = 0;
var films;
connection.query("SELECT * FROM films order by rating desc",
    function (err, results, fields) {
        if (results.length <= 9) {
            maxPage = 1;
        } else {
            maxPage = Math.trunc(results.length / 9)+1;
        }
        films = results;
        // console.log(maxPage);
        // console.log(films);
    }
);