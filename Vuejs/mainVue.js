import Vue from 'vue';
import films from './apps/mainApp.vue';

var indexPageEls = document.getElementsByClassName("number");
console.log(indexPageEls);
var pagePrevEl = document.getElementsByClassName("prev")[0];
var pageNextEl = document.getElementsByClassName("next")[0];

var indexPage = 1;
var maxPages;
let maxPageReq = new XMLHttpRequest();
maxPageReq.open("get", "/maxpage", true);
maxPageReq.send();
maxPageReq.onload = () => {
    maxPages = maxPageReq.responseText.split('|')[1];

    for (let i = 0; i < indexPageEls.length; i++) {
        if (Number(indexPageEls[i].innerHTML) > maxPages) {
            indexPageEls[i].setAttribute("hidden","");
        } else {
            indexPageEls[i].addEventListener("click", updatePage);
        }
        //indexPageEls[i].addEventListener("click", updatePage);
    }
};

function updatePage() {
    let target = event.target;
    if (target.innerHTML == 2) {
        target.parentElement.setAttribute("class","page-item active");
        target.parentElement.previousElementSibling.setAttribute("class", "page-item");
        pagePrevEl.parentElement.setAttribute("class","page-item");
    }
    if (target.innerHTML == 1) {
        target.parentElement.setAttribute("class", "page-item active");
        target.parentElement.nextElementSibling.setAttribute("class", "page-item");
        pagePrevEl.parentElement.setAttribute("class", "page-item disabled");
    }
    
    indexPage = target.innerHTML;
    getFilms(indexPage);
}



function getFilms(indexPage) {
    //document.location = document.URL + "page=?" + indexPage;
    
    let url = "/page=?" + indexPage; 
    let data = new Array();
    let filmListReq = new XMLHttpRequest();
    filmListReq.open("get", url, true);
    filmListReq.send();
    filmListReq.onload = () => {
        data = JSON.parse(filmListReq.responseText);
        for (let i = 0; i < data.length; i++) {
            let jenresString = data[i].jenre_1;
            if (data[i].jenre_2 != null) {
                jenresString += ', ' + data[i].jenre_2;
            }
            if (data[i].jenre_3 != null) {
                jenresString += ', ' + data[i].jenre_3;
            }
            data[i].jenre_1 = jenresString
        }
        listPage(data);
    };
};
getFilms(indexPage);

function listPage(dat) {
    var vm = new Vue({
        data: {
            arrayFilms: dat
        },  
        render: h => h(films)            
    });
    vm.$mount('#films');
}









// const Vue = require('vue');
// const films = require('./apps/mainApp.vue');
//import * as films from './apps/mainApp.vue'