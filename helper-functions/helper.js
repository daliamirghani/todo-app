const todosData= require("../modules/todos.modules.js");
const userData= require("../modules/users.modules.js");
const mongoose = require("mongoose");

async function filterTodos(id) {
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
module.exports = {filterTodos};