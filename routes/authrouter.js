const { Router } = require("express");
const authrouter = Router();
const authcontroller = require("../controllers/authcontroller.js");

//// auth routes ////
authrouter.post("/signup", authcontroller.signup);
authrouter.post("/signin", authcontroller.signin);
authrouter.post("/signout", authcontroller.signout);

module.exports = authrouter;