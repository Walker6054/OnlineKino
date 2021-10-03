const path = require('path');
const pathDir = path.dirname(__dirname);

exports.index = function (request, response) {
    response.sendFile(pathDir + '/views/main.html');
};
exports.admin = function (request, response) {
    response.sendFile(pathDir + '/views/adminPanel.html');
};

exports.about = function (request, response) {
    response.send("О сайте");
};