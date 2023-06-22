const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const toDoSchema = new Schema(
  {
    todo: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

toDoSchema.plugin(AutoIncrement, { inc_field: 'id' });

const ToDoList = mongoose.model("ToDoList", toDoSchema);

module.exports = ToDoList;
