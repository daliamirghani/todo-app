const { Router } = require("express");
const authrouter = Router();
const authcontroller = require("../controllers/auth.controller.js");
//// auth routes ////
authrouter.post("/signup", authcontroller.signup);
authrouter.post("/signin", authcontroller.signin);
authrouter.post("/signout", authcontroller.signout);

module.exports = authrouter;