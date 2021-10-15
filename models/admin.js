const connectDB = require("../models/connectDB");

let res = new Array();
async function getLoginAdmin() {
    try {
        connectDB.query("SELECT login FROM admins",
            function (err, results, fields) {
                res[0] = results;
                res[1] = fields;
            }
        )
    } catch {
        throw new Error("Ошибка!");
    }
}

exports.getLogin = function () {
    getLoginAdmin();
    return res;
};
