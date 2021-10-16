const connectDB = require("../models/connectDB");

let resLog = new Array();
async function getLoginAdmin() {
    try {
        connectDB.query("SELECT login FROM admins",
            function (err, results, fields) {
                resLog[0] = results;
            }
        )
    } catch {
        throw new Error("Ошибка!");
    }
}

let resPass = new Array();
async function getPassAdmin() {
    try {
        connectDB.query("SELECT * FROM admins",
            function (err, results, fields) {
                resPass[0] = results;
            }
        )
    } catch {
        throw new Error("Ошибка!");
    }
}

exports.getLogin = function () {
    getLoginAdmin();
    return resLog;
};

exports.getPass = function () {
    getPassAdmin();
    return resPass;
};