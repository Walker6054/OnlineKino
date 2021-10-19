const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = express.Router();

const parser = express.json();
adminRouter.use(parser);

adminRouter.post("/checkPass", parser, adminController.checkPassUser);
adminRouter.get("/adminPanel", adminController.adminPanel);
 

module.exports = adminRouter;