
const { Router } = require("express");
const todorouter = Router();
const todocontroller = require("../controllers/todo.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js")

todorouter.post("/add-todo",authMiddleware.authenticator, todocontroller.addTodo);
todorouter.put("/change-status/:id",authMiddleware.authenticator,authMiddleware.authorizor, todocontroller.changeStatus);
todorouter.delete("/delete-todo/:id",authMiddleware.authenticator, authMiddleware.authorizor, todocontroller.deleteTodo);
todorouter.get("/getById/:id",authMiddleware.authenticator ,authMiddleware.authorizor, todocontroller.getById);

module.exports= todorouter;
