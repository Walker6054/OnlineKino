const connectDB = require("../models/connectDB");

function getPassAdmin() {
    try {
        connectDB.execute("SELECT * FROM admins",
            function (err, results, fields) {
                getPass(results);
            }
        )
    } catch {
        throw new Error("Ошибка!");
    }
}
let resPass;
function getPass(result) {
    resPass = result;
}


exports.getPassAdmin = getPassAdmin;
exports.getPass = function () {
    return resPass;
};






// const sync = require("node-sync");

// let resLog = new Array();
// function getLoginAdmin() {
//     try {
//         connectDB.query("SELECT login FROM admins",
//             function (err, results, fields) {
//                 resLog[0] = results;
//             }
//         )
//     } catch {
//         throw new Error("Ошибка!");
//     }
// }

// exports.getLogin = function () {
//     getLoginAdmin();
//     return resLog;
// };