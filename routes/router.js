
const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller.js");
const authMiddleware = require("../middleware/auth.middleware.js")

//// to do routes ////
router.post("/add-todo",authMiddleware.authenticator, controller.addTodo);
router.put("/change-status/:id",authMiddleware.authenticator,authMiddleware.authorizor, controller.changeStatus);
router.delete("/delete-todo/:id",authMiddleware.authenticator, authMiddleware.authorizor, controller.deleteTodo);
router.get("/getById/:id",authMiddleware.authenticator ,authMiddleware.authorizor, controller.getById);
// user routes //
router.get("/get-todos",authMiddleware.authenticator, controller.getTodos);
router.get("/get-remain-todo",authMiddleware.authenticator, controller.getRemainTodos);
module.exports= router;
