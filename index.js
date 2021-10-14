const path = require('path');
const mysql = require("mysql2");

const express = require("express");
const app = express();
const homeRouter = require("./routes/homeRouter.js");
 
app.use("/", homeRouter);

//Обработка ошибок
app.use((err, req, res, next) => {
    console.log(err)
    console.log(req)
    console.log(res)
    res.status(404).send("Not Found")
});


 
app.listen(3000);




//использование директории на сервере
app.use('/static', express.static(path.join(__dirname, '/static')));
app.use('/Vuejs', express.static(path.join(__dirname, '/Vuejs')));
app.use('/views', express.static(path.join(__dirname, '/views')));
















// const path = require('path');
// const express = require('express');
// const exphbs = require('express-handlebars');
// const app = express();
// const mysql = require("mysql2");

// const fs = require("fs");






// //объявление шаблонизатора
// // app.engine('.hbs', exphbs({
// //     defaultLayout: 'main',
// //     extname: '.hbs',
// //     layoutsDir: path.join(__dirname, 'views/layouts')
// // }));
// // app.set('view engine', '.hbs');
// // app.set('views', path.join(__dirname, 'views/layouts'));




// var maxPage = 0;
// var films;
// connection.query("SELECT * FROM films order by rating desc",
//     function (err, results, fields) {
//         if (results.length <= 9) {
//             maxPage = 1;
//         } else {
//             maxPage = Math.trunc(results.length / 9)+1;
//         }
//         films = results;
//         // console.log(maxPage);
//         // console.log(films);
//     }
// );



// //загрузка страницы
// app.get('/', (request, response) => {
// 	//response.render('main');
//     response.sendFile(path.join(__dirname + '/views/main.html'));
// });
// //админ панель
// app.get('/admin', (request, response) => {
//     response.sendFile(path.join(__dirname + '/views/adminPanel.html'));
// });


// //POST запросы
// app.post('/', (req, res) => {
    
// });


// //GET запросы
// app.get('/page=?', (req, res) => {
//     let page = req.url.split('?')[1] - 1;

//     let pageFilms = new Array();
//     if (page > maxPage-1) {
//         page = maxPage;
//     }

//     for (let i = 9 * page; i < 9 * page + 9; i++){
//         if (films[i] != undefined) {

//             pageFilms[i % 9] = films[i];
//         }
//     }
// 	res.send(pageFilms);
// });

// app.get('/maxpage', (req, res) => {
//     let url = req.url;
// 	res.send(url+'|'+maxPage);
// });






// //Запуск сервера
// app.listen(3000, "localhost");





// // var listFilmJson = JSON.parse(fs.readFileSync("films.json"));
// // for (let i = 0; i < listFilmJson.length; i++) {
// //     if ((listFilmJson[i].nameRu.includes('сериал'))||(listFilmJson[i].rating.includes('%'))) {
// //         console.log(listFilmJson[i].nameRu);
// //     } else {
// //         connection.query(`INSERT INTO films(nameFilm, yearOfMake, imgPoster, time, age, rating, ratingFrom)
// //                             VALUES ("`+listFilmJson[i].nameRu+'","'+listFilmJson[i].year+'","'+listFilmJson[i].posterUrl+'","'+listFilmJson[i].filmLength+'","16+","'+listFilmJson[i].rating+'","Кинопоиск")',
// //             function (err, result, fields) {
// //                 console.log(err);
// //             }
// //         )
// //     }
// // }