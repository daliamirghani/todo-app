const { TopologyDescription } = require("mongodb");
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
const changeStatus = async (req, res) => { //sets todo to true
 try {
  let id = req.params.id;
  id = new mongoose.Types.ObjectId(id);
    {await todosData.findByIdAndUpdate(id,  { $set: {status: true} },);
    }
    res.status(200).json({
      "success": true,
      "message": "Todo status updated successfully"
    })
 } catch (error){
  res.status(500).json({
    "success": false,
    "message": "Todo status failed to update"
  })
 }   
};
const deleteTodo = async (req, res) => {  
  try {
  let id = req.params.id;
  id = new mongoose.Types.ObjectId(id);
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
const getById = async (req, res) => {
try {
  let id = req.params.id;
  id = new mongoose.Types.ObjectId(id);
 const currentTodo = await todosData.findById(id);
  if (currentTodo){
    res.status(200).json({
      "success": true,
      "todo": {
        "id": currentTodo._id,
        "title": currentTodo.title,
        "description": currentTodo.description,
        "status": currentTodo.status,
        "userId": currentTodo.userId
      }
    })
  }
}
catch (error){
  res.status(500).json({
    "success": false,
    "msg": "Error getting todo"
})
}

}; 
const getTodos = async (req, res) => {
  try {
    let todoList = await filterTodos("todos",req.userId);
    if (todoList) {
      res.status(200).json({
        "success": true,
        "todos": todoList,
      });
    }
  } catch {
    res.status(500).json({
      "success": false,
      "msg": "Error getting all todos"
    });
  }
};
const getRemainTodos = async (req, res) => {
 try {
  let todoList = await filterTodos("remainingTodos",req.userId);
  let remainingTodos= todoList.filter(todo=>todo.status === false);
  if (todoList) {
    res.status(200).json({
      "success": true,
      "remainingTodos": remainingTodos,
    });
  }
} catch {
  res.status(500).json({
    "success": false,
    "msg": "Error getting all remaining todos"
  });
}
}
// helper function
async function filterTodos(name, id) {
  let userTodos = await userData.findOne({ _id: id }); // todos of authorized user
  let todoIds = userTodos.todos; // array of todo ids only
  let todoList = await todosData.find({ _id: { $in: todoIds } }); // array of all todo posts corresponding to ids

  return todoList.map(todo => ({
    id: todo._id, // rename _id
    title: todo.title,
    description: todo.description,
    status: todo.status,
    userId: todo.userId
  }));
};

module.exports =
{
 addTodo,
 changeStatus,
 deleteTodo,
 getById,
 getTodos,
 getRemainTodos,
}