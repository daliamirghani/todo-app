
const { Router } = require("express");
const userrouter = Router();
const usercontroller = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js")


userrouter.get("/get-todos",authMiddleware.authenticator, usercontroller.getTodos);
userrouter.get("/get-remain-todo",authMiddleware.authenticator, usercontroller.getRemainTodos);
module.exports= userrouter;