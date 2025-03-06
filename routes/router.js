const { Router } = require("express");
const app = Router();
const controller = require("../controllers/controller.js");

//// to do routes ////
app.post("/add-todo", controller.addtodo(req,res));
app.put("change-status/:id", controller.changestatus(req,res));
app.delete("delete-todo/:id", controller.deletetodo(req,res));
app.get("getById/:id", controller.getbyid(req,res));
//// user routes ////
app.get("get-todos", controller.gettodos(req,res));
app.get("get-remain-todo", controller.getremaintodos(req,res));
module.exports= router;
