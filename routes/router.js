const { Router } = require("express");
const app = Router();
const controller = require("../controllers/controller.js");

//// to do routes ////
app.post("add-todo", controller.addtodo);
app.put("change-status/:id", controller.changestatus);
app.delete("delete-todo/:id", controller.deletetodo);
app.get("getById/:id", controller.getbyid);
//// user routes ////
app.get("get-todos", controller.gettodos);
app.get("get-remain-todo", controller.getremaintodos);
module.exports= router;
