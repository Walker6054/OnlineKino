const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = express.Router();

adminRouter.post("/admins", adminController.index);
 

module.exports = adminRouter;