const todosData= require("../modules/todos.modules.js");
const userData= require("../modules/users.modules.js");
const mongoose = require("mongoose");
const helper = require("../helper-functions/helper.js")


const getTodos = async (req, res) => {
    try {
      let todoList = await helper.filterTodos(req.userId);
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
    let todoList = await helper.filterTodos(req.userId);
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
  module.exports =
  {
   getTodos,
   getRemainTodos,
  }