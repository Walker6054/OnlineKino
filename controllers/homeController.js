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
    getGenresFilms();
    setTimeout(() => {
        for (let i = 9 * page; i < 9 * page + 9; i++){
            if (films[i] != undefined) {
                
                let stringGenresFilms = "";
                for (let j = 0; j < arrGenresFilms.length; j++){
                    if (films[i].idfilms == arrGenresFilms[j].idFilm) {
                        if (stringGenresFilms == "") {
                            stringGenresFilms += arrGenresFilms[j].genre;
                        } else {
                            stringGenresFilms += ', ' + arrGenresFilms[j].genre;
                        }
                    }
                }

                pageFilms[i % 9] = {
                    age: films[i].age,
                    idfilms: films[i].idfilms,
                    imgPoster: films[i].imgPoster,
                    nameFilm: films[i].nameFilm,
                    rating: films[i].rating,
                    ratingFrom: films[i].ratingFrom,
                    time: films[i].time,
                    yearOfMake: films[i].yearOfMake,
                    genres: stringGenresFilms
                };
            }
        }

        let result = new Array();
        result[0] = pageFilms;
        result[1] = arrGenres;
        // console.log(result);
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
//получение жанров фильмов
var arrGenresFilms = new Array();
function getGenresFilms() {
    connectDB.query("SELECT * FROM GenresFilms",
        function (err, results, fields) {
            arrGenresFilms = results;
        }
    );
}


//реализация сортировки
exports.getSort = function (request, response) {
    let data = request.body;

    if ((data.genresArr.length == 0) && (data.rating == -1) && (data.sort == -1) && (data.year1 == 1980) && (data.year2 == 2021)) {
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

        connectDB.query(`
            SELECT DISTINCT F.* FROM Films F `+ stringTablesGenres +` where
                F.yearOfMake >= `+ data.year1 +` AND
                F.yearOfMake <= `+ data.year2 +` AND
                F.rating >= `+ data.rating + stringGenres+`

                order by `+ sortField + ' ' + sortVar ,

            function (err, results, fields) {
                let arrayFilmsWithGenres = new Array();
                for (let i = 0; i < results.length; i++){
                    let stringGenresFilms = "";
                    for (let j = 0; j < arrGenresFilms.length; j++){
                        if (results[i].idfilms == arrGenresFilms[j].idFilm) {
                            if (stringGenresFilms == "") {
                                stringGenresFilms += arrGenresFilms[j].genre;
                            } else {
                                stringGenresFilms += ', ' + arrGenresFilms[j].genre;
                            }
                        }
                    }

                    arrayFilmsWithGenres[i] = {
                        age: results[i].age,
                        idfilms: results[i].idfilms,
                        imgPoster: results[i].imgPoster,
                        nameFilm: results[i].nameFilm,
                        rating: results[i].rating,
                        ratingFrom: results[i].ratingFrom,
                        time: results[i].time,
                        yearOfMake: results[i].yearOfMake,
                        genres: stringGenresFilms
                    };
                }
                response.send(JSON.stringify(arrayFilmsWithGenres));
            }
        );
    }
};


exports.getSearchResult = function (request, response) {
    let data = request.body.value;
    let checkSQL = data.toLowerCase();
    if (checkSQL.includes("select") ||
        checkSQL.includes("where") ||
        checkSQL.includes("from") ||
        checkSQL.includes("insert") ||
        checkSQL.includes("delete") ||
        checkSQL.includes("order") ||
        checkSQL.includes("group") ||
        checkSQL.includes("union") ||
        checkSQL.includes("cast") ||
        checkSQL.includes("having") ||
        checkSQL.includes("like") ||
        checkSQL.includes("distinct")
    ) {
        response.status(800).send("STOP!");
    } else {
        connectDB.query("SELECT DISTINCT * FROM Films where nameFilm like '%" + data + "%' order by rating",
            function (err, results, fields) {
                let arrayFilmsSearch = new Array();
                for (let i = 0; i < results.length; i++){
                    let stringGenresFilms = "";
                    for (let j = 0; j < arrGenresFilms.length; j++){
                        if (results[i].idfilms == arrGenresFilms[j].idFilm) {
                            if (stringGenresFilms == "") {
                                stringGenresFilms += arrGenresFilms[j].genre;
                            } else {
                                stringGenresFilms += ', ' + arrGenresFilms[j].genre;
                            }
                        }
                    }

                    arrayFilmsSearch[i] = {
                        age: results[i].age,
                        idfilms: results[i].idfilms,
                        imgPoster: results[i].imgPoster,
                        nameFilm: results[i].nameFilm,
                        rating: results[i].rating,
                        ratingFrom: results[i].ratingFrom,
                        time: results[i].time,
                        yearOfMake: results[i].yearOfMake,
                        genres: stringGenresFilms
                    };
                }
                response.send(JSON.stringify(arrayFilmsSearch));
            }
        );
    }
    
};