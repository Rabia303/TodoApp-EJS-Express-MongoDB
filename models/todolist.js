const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  TodoItem: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const TodoApp = mongoose.model("Todolist", todoSchema);

module.exports = TodoApp;
