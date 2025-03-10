const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller.js");
const authMiddleware = require("./middleware/auth.middleware.js")

//// to do routes ////
router.post("add-todo", controller.addTodo);
router.put("change-status/:id", controller.changeStatus);
router.delete("delete-todo/:id", controller.deleteTodo);
router.get("getById/:id", controller.getById);
router.get("get-todos", controller.getTodos);
router.get("get-remain-todo", controller.getRemainTodos);
module.exports= router;
