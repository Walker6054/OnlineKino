const vue = require('vue');
var indexPage = document.getElementById("films").getAttribute("name");

var data;
let myRequest = new XMLHttpRequest();
myRequest.open("get", "?page="+indexPage, true);
myRequest.send(indexPage);
myRequest.onload = async () => {
    await myRequest.response;
    data = myRequest.response;
};
    
var mainApp = new vue({

});