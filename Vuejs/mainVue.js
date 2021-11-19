import Vue from 'vue';
import mainPage from './apps/main.vue';
import filterFilms from './apps/filterFilmsMain.vue';

var pagePrevEl;
var pageNextEl;

var indexPage = 1;
var maxPages;
let maxPageReq = new XMLHttpRequest();
    maxPageReq.open("get", "/maxpage", true);
    maxPageReq.send();
    maxPageReq.onload = () => {
        maxPages = maxPageReq.responseText.split('|')[1];
    };


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
}


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

    console.log(filterData);

    let url = "/getSort";
    //let data = new Array();
    let sortArrayReq = new XMLHttpRequest();
    sortArrayReq.open("post", url, true);
    sortArrayReq.setRequestHeader(
            'Content-Type',
            'application/json'
        )
    sortArrayReq.send(JSON.stringify(filterData));
    sortArrayReq.onload = () => {
        console.log("data");
        console.log(sortArrayReq.response);
        console.log(sortArrayReq.status);

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

        //console.log(flagResponce); 

        var vm = new Vue({
            data: {
                arrayFilms: data,
                flagSearching: flagResponce
            },  
            render: h => h(filterFilms)            
        });
        vm.$mount('#blockFilms');
    }
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
