const connectDB = require("../models/connectDB");
const path = require('path');
const pathDir = path.dirname(__dirname);


exports.index = function (request, response) {
    response.sendFile(pathDir + '/views/main.html');
};
exports.admin = function (request, response) {
    response.sendFile(pathDir + '/views/adminPanel.html');
};

exports.maxpage = function (request, response) {
    let url = request.url;
	response.send(url+'|'+maxPage);
};

exports.pageInfo = function (request, response) {
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

    let result = new Array();
    result[0] = pageFilms;
    result[1] = arrGenres;
    console.log(result);
	response.send(JSON.stringify(result));
};


//получение фильмов
var maxPage = 0;
var films;
connectDB.query("SELECT * FROM films order by rating desc",
    function (err, results, fields) {
        if (results.length <= 9) {
            maxPage = 1;
        } else {
            maxPage = Math.trunc(results.length / 9)+1;
        }
        films = results;
    }
);

//получение жанров
var arrGenres = new Array();
connectDB.query("SELECT * FROM genres order by idGenres",
    function (err, results, fields) {
        arrGenres = results;
    }
);








// exports.films = function (request, response) {
//     let page = request.url.split('?')[1] - 1;

//     let pageFilms = new Array();
//     if (page > maxPage-1) {
//         page = maxPage;
//     }

//     for (let i = 9 * page; i < 9 * page + 9; i++){
//         if (films[i] != undefined) {

//             pageFilms[i % 9] = films[i];
//         }
//     }
// 	response.send(pageFilms);
// };

// exports.genres = function (request, response) {
// 	response.send(arrGenres);
// };
