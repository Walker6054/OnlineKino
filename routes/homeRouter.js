const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

homeRouter.get("/", homeController.index);
homeRouter.get("/admin", homeController.admin);
 
module.exports = homeRouter;