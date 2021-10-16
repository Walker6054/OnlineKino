const modelAdmin = require("../models/admin");
const path = require('path');
const pathDir = path.dirname(__dirname);

exports.checkPassUser = function (request, response) {
    let data = request.body;
    console.log(data);

    let arrayAdmins = modelAdmin.getPass();
    console.log(arrayAdmins);

    let flagLogin = false;
    for (let i = 0; i < arrayAdmins.length; i++) {
        if ((data.login == arrayAdmins[i][0].login)&&(data.password == arrayAdmins[i][0].password)) {
            flagLogin = true;
            break;
        }
    }

    if (flagLogin) {
        response.sendFile(pathDir + '/views/adminPanel.html');
    } else {
        response.status(404).send("Неверный пароль");
    }
};