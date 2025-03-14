const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller.js");
const authMiddleware = require("../middleware/auth.middleware.js")
//// to do routes ////
router.post("/add-todo",authMiddleware, controller.addTodo);
router.put("/change-status/:id",authMiddleware, controller.changeStatus);
router.delete("/delete-todo/:id",authMiddleware, controller.deleteTodo);
router.get("/getById/:id",authMiddleware, controller.getById);
// user routes //
router.get("/get-todos",authMiddleware, controller.getTodos);
router.get("/get-remain-todo",authMiddleware, controller.getRemainTodos);
module.exports= router;
