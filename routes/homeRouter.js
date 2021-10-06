const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

homeRouter.get("/", homeController.index);

homeRouter.get("/admin", homeController.admin);

homeRouter.get("/page=?", homeController.films);

homeRouter.get("/maxpage", homeController.maxpage);
 
module.exports = homeRouter;