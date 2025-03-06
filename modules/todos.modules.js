const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    require: true,
  }
  }
);
module.exports =mongoose.model("Todos", todoSchema);