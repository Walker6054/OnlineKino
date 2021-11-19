const connectDB = require("../models/connectDB");
const path = require('path');
const pathDir = path.dirname(__dirname);


exports.index = function (request, response) {
    response.sendFile(pathDir + '/views/main.html');
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
    getFilms();
    getGenres();
    setTimeout(() => {
        for (let i = 9 * page; i < 9 * page + 9; i++){
            if (films[i] != undefined) {
                pageFilms[i % 9] = films[i];
            }
        }

        let result = new Array();
        result[0] = pageFilms;
        result[1] = arrGenres;
        //console.log(result);
        response.send(JSON.stringify(result));
    }, 1000);
};
//получение фильмов
var maxPage = 0;
var films;
function getFilms() {
    connectDB.query("SELECT * FROM Films order by rating desc",
        function (err, results, fields) {
            if (results.length <= 9) {
                maxPage = 1;
            } else {
                maxPage = Math.trunc(results.length / 9)+1;
            }
            films = results;
        }
    );
}
//получение жанров
var arrGenres = new Array();
function getGenres() {
    connectDB.query("SELECT * FROM Genres order by idGenres",
        function (err, results, fields) {
            arrGenres = results;
        }
    );
}


exports.getSort = function (request, response) {
    console.log(request.body);
    let data = request.body;

    if ((data.genresArr.length == 0) && (data.rating == -1) && (data.sort == -1) && (data.year1 == -1) && (data.year2 == -1)) {
        response.status(800).send("giveFilters");
    } else {
        let sortField;
        let sortVar;
        switch (data.sort) {
            case "1": sortField = "F.nameFilm"; sortVar = "asc"; break;
            case "2": sortField = "F.yearOfMake"; sortVar = "desc"; break;
            case "3": sortField = "F.rating"; sortVar = "desc"; break;
            case -1: sortField = "F.rating"; sortVar = "desc"; break;
        }

        let stringGenres = "";
        let stringTablesGenres = "";
        for (let i = 0; i < data.genresArr.length; i++) {
            stringTablesGenres = ", GenresFilms GF, Genres G";
            if (i == 0) {
                if (data.genresArr.length == 1) {
                    stringGenres = " AND F.idfilms = GF.idFilm AND GF.genre = G.genre AND G.idGenres = " + data.genresArr[i];
                } else {
                    stringGenres = " AND F.idfilms = GF.idFilm AND GF.genre = G.genre AND ( G.idGenres = " + data.genresArr[i];
                }
            } else {
                stringGenres += " OR G.idGenres = " + data.genresArr[i];
                if (i == data.genresArr.length - 1) {
                    stringGenres += ') ';
                }
            }
        }
        console.log(stringGenres);

        connectDB.query(`
            SELECT DISTINCT F.* FROM Films F `+ stringTablesGenres +` where
                F.yearOfMake >= `+ data.year1 +` AND
                F.yearOfMake <= `+ data.year2 +` AND
                F.rating >= `+ data.rating + stringGenres+`

                order by `+ sortField + ' ' + sortVar ,

            function (err, results, fields) {
                console.log(results);
                response.send(JSON.stringify(results));
            }
        );
    }
};













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
