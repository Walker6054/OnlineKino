const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

const parser = express.json();
homeRouter.use(parser);

homeRouter.get("/", homeController.index);

homeRouter.get("/maxpage", homeController.maxpage);

homeRouter.get("/pageinfo=?", homeController.pageInfo);

homeRouter.post("/getSort", parser, homeController.getSort);

// homeRouter.get("/page=?", homeController.films);
// homeRouter.get("/genres", homeController.genres);
 

module.exports = homeRouter;