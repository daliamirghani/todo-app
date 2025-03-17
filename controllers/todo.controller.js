const { TopologyDescription } = require("mongodb"); //idk why this is here
const todosData= require("../modules/todos.modules.js");
const userData= require("../modules/users.modules.js");
const mongoose = require("mongoose");
const helper = require("../helper-functions/helper.js")
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
  else
  {  res.status(500).json({
    "success": false,
    "msg": "Error getting todo"
})}
}
catch (error){
  res.status(500).json({
    "success": false,
    "msg": "Error getting todo"
})
}

}; 

// helper function


module.exports =
{
 addTodo,
 changeStatus,
 deleteTodo,
 getById,
}