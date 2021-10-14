const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

homeRouter.get("/", homeController.index);

homeRouter.get("/admin", homeController.admin);

homeRouter.get("/maxpage", homeController.maxpage);

homeRouter.get("/pageinfo=?", homeController.pageInfo);

// homeRouter.get("/page=?", homeController.films);
// homeRouter.get("/genres", homeController.genres);
 

module.exports = homeRouter;