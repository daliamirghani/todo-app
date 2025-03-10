const todosData= require("../modules/todos.modules.js");
const userData= require("../modules/users.modules.js");
const mongoose = require("mongoose");
const addTodo = async (req, res) => {
  
   try {
         const input = req.body;
         input.userId =req.userId;
         const newTodo = await todosData.create(input);
         await userData.findByIdAndUpdate(newTodo.userId,  { $push: { todos: newTodo} },)
         res.status(201).json({
            "success": true,
            "message": "Todo added successfully",
            "todo": {
              "id": newTodo._id,
              "title": newTodo.title,
              "description": newTodo.description,
              "status": newTodo.status,
              "userId": newTodo.userId,
            }
          });
       } catch (error) {
         res.status(500).json({
           "success": false,
           "message": "Error adding todo"
         });
       }
       


};
const changeStatus = (req, res) => {
    
};
const deleteTodo = async (req, res) => {  
  try {
  let id = req.params.id;
  console.log("hi up", id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid ObjectId:", id);
    return res.status(400).json({ message: "Invalid ID format" });
}
id = new mongoose.Types.ObjectId(id);





  console.log("hi down", id);
  console.log(req.userId, id);
  await userData.findByIdAndUpdate(req.userId,  { $pull: {todos: id} },)
  await todosData.findByIdAndDelete(id);
  res.status(201).json({
    "success": true,
    "message": "Todo deleted successfully"
  });
} catch (error) {
  res.status(500).json({
    "success": false,
    "message": "Error deleting todo"
  });
}};
const getById = (req, res) => {};

const getTodos = (req, res) => {};
const getRemainTodos = (req, res) => {};

module.exports =
{
 addTodo,
 changeStatus,
 deleteTodo,
 getById,
 getTodos,
 getRemainTodos,
}