import Vue from 'vue';
import mainPage from './apps/main.vue';
// import films from './apps/mainApp.vue';
// import genres from './apps/mainGenresApp.vue';

var indexPageEls;
var pagePrevEl;
var pageNextEl;

var indexPage = 1;
var maxPages;
let maxPageReq = new XMLHttpRequest();
    maxPageReq.open("get", "/maxpage", true);
    maxPageReq.send();
    maxPageReq.onload = () => {
        maxPages = maxPageReq.responseText.split('|')[1];
        // for (let i = 0; i < indexPageEls.length; i++) {
        //     if (Number(indexPageEls[i].innerHTML) > maxPages) {
        //         indexPageEls[i].setAttribute("hidden","");
        //     } else {
        //         indexPageEls[i].addEventListener("click", updatePage);
        //     }
        //     //indexPageEls[i].addEventListener("click", updatePage);
        // }
        console.log("ok MaxPage = " + maxPages);
    };


function getMain(indexPage) {
    let url = "/pageinfo=?" + indexPage;
    let data = new Array();
    let mainPage = new XMLHttpRequest();
    mainPage.open("get", url, true);
    mainPage.send();
    mainPage.onload = () => {
        data = JSON.parse(mainPage.response);
        console.log("data");
        console.log(data);
        listMain(data);
    }
}
getMain(indexPage);

function listMain(dat) {
    var vm = new Vue({
        data: {
            arrayFilms: dat[0],
            arrayGenres: dat[1]
        },  
        render: h => h(mainPage)            
    });
    vm.$mount('#body');

    indexPageEls = document.getElementsByClassName("number");
    pagePrevEl = document.getElementsByClassName("prev")[0];
    pageNextEl = document.getElementsByClassName("next")[0];
    for (let i = 0; i < indexPageEls.length; i++) {
        if (Number(indexPageEls[i].innerHTML) > maxPages) {
            indexPageEls[i].setAttribute("hidden","");
        } else {
            indexPageEls[i].addEventListener("click", updatePage);
        }
    }
}


function updatePage() {
    let target = event.target;
    console.log(target);
    indexPage = target.innerHTML;
    getMain(indexPage);
    if (target.innerHTML == 2) {
        indexPageEls[0].innerHTML = 1;
        indexPageEls[1].innerHTML = 2;
        indexPageEls[2].innerHTML = 3;

        indexPageEls[1].parentElement.setAttribute("class","page-item active");
        indexPageEls[0].parentElement.setAttribute("class", "page-item");
        indexPageEls[2].parentElement.setAttribute("class", "page-item");
        pagePrevEl.parentElement.setAttribute("class","page-item");
    }
    if (target.innerHTML == 1) {
        target.parentElement.setAttribute("class", "page-item active");
        target.parentElement.nextElementSibling.setAttribute("class", "page-item");
        pagePrevEl.parentElement.setAttribute("class", "page-item disabled");
    }

    if (target.getAttribute("class").split(" ")[2] == "third") {
        indexPageEls[0].innerHTML = Number(target.innerHTML)-1;
        indexPageEls[1].innerHTML = Number(target.innerHTML);
        indexPageEls[2].innerHTML = Number(target.innerHTML)+1;
        for (let i = 0; i < indexPageEls.length; i++) {
            if (Number(indexPageEls[i].innerHTML) > maxPages) {
                indexPageEls[i].setAttribute("hidden","");
            } else {
                indexPageEls[i].addEventListener("click", updatePage);
            }
        }
        //target.parentElement.setAttribute("class","page-item active");
        target.parentElement.previousElementSibling.setAttribute("class", "page-item active");
        target.parentElement.previousElementSibling.previousElementSibling.setAttribute("class", "page-item");
        pagePrevEl.parentElement.setAttribute("class","page-item");
    }
    window.scrollTo(0,0);
}






// function getFilms(indexPage) { 
//     let url = "/page=?" + indexPage; 
//     let data = new Array();
//     let filmListReq = new XMLHttpRequest();
//     filmListReq.open("get", url, true);
//     filmListReq.send();
//     filmListReq.onload = () => {
//         data = JSON.parse(filmListReq.responseText);
//         // for (let i = 0; i < data.length; i++) {
//         //     let jenresString = data[i].jenre_1;
//         //     if (data[i].jenre_2 != null) {
//         //         jenresString += ', ' + data[i].jenre_2;
//         //     }
//         //     if (data[i].jenre_3 != null) {
//         //         jenresString += ', ' + data[i].jenre_3;
//         //     }
//         //     data[i].jenre_1 = jenresString
//         // }
//         listPage(data);
//     };
// };
// getFilms(indexPage);

// function listPage(dat) {
//     var vm = new Vue({
//         data: {
//             arrayFilms: dat
//         },  
//         render: h => h(films)            
//     });
//     vm.$mount('#films');
// }

// //запрос жанров
// let listGenres = new XMLHttpRequest();
// listGenres.open("get", "/genres", true);
// listGenres.send();
// listGenres.onload = () => {
//     console.log(listGenres.response);
//     listPageGenres(JSON.parse(listGenres.response));
// };

// function listPageGenres(dat) {
//     var vm = new Vue({
//         data: {
//             arrayGenres: dat
//         },  
//         render: h => h(genres)
//     });
//     vm.$mount('#genres');
// }









// const Vue = require('vue');
// const films = require('./apps/mainApp.vue');
//import * as films from './apps/mainApp.vue'