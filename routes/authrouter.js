const { Router } = require("express");
const authrouter = Router();
const authcontroller = require("../controllers/authcontroller.js");

//// auth routes ////
app.post("/signup", authcontroller.signup(req,res));
app.post("signin", authcontroller.signun(req,res));
app.post("/signout", authcontroller.signout(req,res));

module.exports = authrouter;