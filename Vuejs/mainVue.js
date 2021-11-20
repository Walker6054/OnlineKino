import Vue from 'vue';
import mainPage from './apps/main.vue';
import filterFilms from './apps/filterFilmsMain.vue';
import filmPage from './apps/film.vue';

let pagePrevEl;
let pageNextEl;
let indexPage = 1;
let maxPages;

//запрос на максимальное количество страниц
let maxPageReq = new XMLHttpRequest();
    maxPageReq.open("get", "/maxpage", true);
    maxPageReq.send();
    maxPageReq.onload = () => {
        maxPages = maxPageReq.responseText.split('|')[1];
    };

//запрос на текущую страницу и вызов отрисовки
function getMain(indexPage) {
    let url = "/pageinfo=?" + indexPage;
    let data = new Array();
    let mainPage = new XMLHttpRequest();
    mainPage.open("get", url, true);
    mainPage.send();
    mainPage.onload = () => {
        data = JSON.parse(mainPage.response);
        listMain(data);
    }
}
getMain(indexPage);

//Отрисовка главной страницы
function listMain(dat) {
    var vm = new Vue({
        data: {
            arrayFilms: dat[0],
            arrayGenres: dat[1],
            indexOfPage: indexPage
        },  
        render: h => h(mainPage)            
    });
    vm.$mount('#body');

    pagePrevEl = document.getElementsByClassName("prev")[0];
    pageNextEl = document.getElementsByClassName("next")[0];

    if (indexPage == 1) {
        pagePrevEl.setAttribute("disabled", "");
        pageNextEl.removeAttribute("disabled");
    } else {
        if (indexPage < maxPages) {
            pagePrevEl.removeAttribute("disabled");
            pageNextEl.removeAttribute("disabled");
        } else {
            if (indexPage >= maxPages) {
                pagePrevEl.removeAttribute("disabled");
                pageNextEl.setAttribute("disabled", "");
            }
        }
    }

    pageNextEl.addEventListener("click", updatePage);
    pagePrevEl.addEventListener("click", updatePage);

    document.getElementsByClassName("buttonCommitFilter")[0].addEventListener("click", sendFilters);
    document.getElementById("buttonSearch").addEventListener("click", searchFilm);

    let buttonsGotoFilm = document.getElementsByClassName("buttonGotoFilm");
    for (let i = 0; i < buttonsGotoFilm.length; i++){
        buttonsGotoFilm[i].addEventListener("click", getInformationFilm);
    }
}

//Обновление страницы при перелистывании страниц
function updatePage() {
    let target = event.target;

    pagePrevEl = document.getElementsByClassName("prev")[0];
    pageNextEl = document.getElementsByClassName("next")[0];
    pagePrevEl.setAttribute("disabled", "");
    pageNextEl.setAttribute("disabled", "");

    if (target.getAttribute("class") == "page-link next") {
        indexPage++;
    } else {
        indexPage--;
    }
    getMain(indexPage);
    setTimeout(
        () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300
    );
}


//---------------------СОРТИРОВКА---------------------------------------------------------------
function sendFilters() {
    let checkedGenres = document.getElementsByClassName("genresInput");
    let listCheckedGenres = new Array();
    let index = 0;
    for (let i = 0; i < checkedGenres.length; i++) {
        if (checkedGenres[i].checked) {
            listCheckedGenres[index] = checkedGenres[i].getAttribute("id").split("f")[1];
            index++;
        }
    };

    let year1 = document.getElementById("inputYear1").value;
    let year2 = document.getElementById("inputYear2").value;
    if ((year1 == "") && (year2 == "")) {
        year1 = 1980;
        year2 = 2021;
    } else {
        if ((year1 != "") && (year2 == "")) {
            year2 = 2021;
        } else {
            if ((year1 == "") && (year2 != "")) {
                year1 = 1980;
            }
        }
    }

    let ratingsButtons = document.getElementsByName("rating");
    let valueRating = -1;
    for (let i = 0; i < ratingsButtons.length; i++) {
        if (ratingsButtons[i].checked) {
            valueRating = ratingsButtons[i].value;
            break;
        }
    }

    let sortSelect = document.getElementsByClassName("selectSort")[0].value;
    if (sortSelect == "Сортировать по:") { sortSelect = -1; }

    let filterData = {
        genresArr: listCheckedGenres,
        year1: year1,
        year2: year2,
        rating: valueRating,
        sort: sortSelect
    };

    let url = "/getSort";
    let sortArrayReq = new XMLHttpRequest();
    sortArrayReq.open("post", url, true);
    sortArrayReq.setRequestHeader(
            'Content-Type',
            'application/json'
        )
    sortArrayReq.send(JSON.stringify(filterData));
    sortArrayReq.onload = () => {
        if (sortArrayReq.status != 800) {
            let data = JSON.parse(sortArrayReq.response);

            let flagResponce;
            if (data.length != 0) {
                flagResponce = true;
            } else {
                flagResponce = false;
            }

            if ((sortArrayReq.status == 200)&&(document.getElementsByClassName("pagination")[0])) {
                document.getElementsByClassName("pagination")[0].setAttribute("hidden", "");
            }

            var vm = new Vue({
                data: {
                    arrayFilms: data,
                    flagSearching: flagResponce
                },  
                render: h => h(filterFilms)            
            });
            vm.$mount('#blockFilms');

            let buttonBackMain = document.getElementsByClassName('buttonbackToMain')[0];
            buttonBackMain.addEventListener("click", () => { window.location.reload() });
            let buttonsGotoFilm = document.getElementsByClassName("buttonGotoFilm");
            for (let i = 0; i < buttonsGotoFilm.length; i++){
                buttonsGotoFilm[i].addEventListener("click", getInformationFilm);
            }
        } else {
            alert("Произошла ошибка, введите фильтры пожалуйста!");
        }
    }
}

//---------------------ПОИСК---------------------------------------------------------------
function searchFilm() {
    let inputNameFilm = document.getElementById("inputSearch");

    let url = "/getSearchResult";
    let searchReq = new XMLHttpRequest();
    let data = {value: inputNameFilm.value};
    searchReq.open("post", url, true);
    searchReq.setRequestHeader(
            'Content-Type',
            'application/json'
        )
    searchReq.send(JSON.stringify(data));
    searchReq.onload = () => {
        if (searchReq.status != 800) {
            let data = JSON.parse(searchReq.response);

            let flagResponce;
            if (data.length != 0) {
                flagResponce = true;
            } else {
                flagResponce = false;
            }

            var vm = new Vue({
                data: {
                    arrayFilms: data,
                    flagSearching: flagResponce
                },  
                render: h => h(filterFilms)            
            });
            vm.$mount('#blockFilms');

            let buttonBackMain = document.getElementsByClassName('buttonbackToMain')[0];
            buttonBackMain.addEventListener("click", () => { window.location.reload() });

            let buttonsGotoFilm = document.getElementsByClassName("buttonGotoFilm");
            for (let i = 0; i < buttonsGotoFilm.length; i++){
                buttonsGotoFilm[i].addEventListener("click", getInformationFilm);
            }
        } else {
            alert("Скажем НЕТ sql-инъекциям!");
        }
    }
}





//---------------------СТРАНИЦА ФИЛЬМА---------------------------------------------------------------
function getInformationFilm() {
    let targetID = event.target.getAttribute("id");

    let url = "/filminfo=?"+targetID;
    let filmReq = new XMLHttpRequest();
    filmReq.open("get", url, true);
    filmReq.send();
    filmReq.onload = () => {
        if (filmReq.status != 800) {
            console.log(filmReq.response);
            console.log(JSON.parse(filmReq.response));
            var vm = new Vue({
                data: {
                    arrayFilm: JSON.parse(filmReq.response)
                },  
                render: h => h(filmPage)            
            });
            vm.$mount('#body');
        } else {
            alert("Произошла ошибка, фильм не найден!");
        }
    } 
}