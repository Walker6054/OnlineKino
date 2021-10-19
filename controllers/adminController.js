const modelAdmin = require("../models/admin");
const path = require('path');
const pathDir = path.dirname(__dirname);

exports.checkPassUser = function (request, response) {
    let data = request.body;

    modelAdmin.getPassAdmin();
    setTimeout(() => {
        let arrayAdmins = modelAdmin.getPass();

        let flagLogin = false;
        for (let i = 0; i < arrayAdmins.length; i++) {
            if ((data.login == arrayAdmins[i].login)&&(data.password == arrayAdmins[i].password)) {
                flagLogin = true;
                break;
            }
        }

        if (flagLogin) {
            response.send("/adminPanel");
        } else {
            response.status(404).send("Неверный пароль");
        }
    }, 1000);
    
};

exports.adminPanel = function (request, response) {
    response.sendFile(pathDir + '/views/adminPanel.html');
};