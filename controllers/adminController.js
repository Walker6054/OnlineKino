const modelAdmin = require("../models/admin");
const bodyParser = require("body-parser");
//bodyPars.urlencoded({ extended: true });
//bodyParser.urlencoded({ extended: true });


exports.index = function (request, response) {
    //console.log(bodyParser.text(request));
    console.log(modelAdmin.getLogin());
    response.send(modelAdmin.getLogin());
};