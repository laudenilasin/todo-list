const express = require("express");
const router = express.Router();
const ToDoController = require("../controllers/todo.controller");

router.get("/:page/:limit", ToDoController.getToDoListItems);
router.post("/", ToDoController.saveToDoItem);
router.put("/", ToDoController.updateToDoItem);
router.delete("/", ToDoController.deleteToDoItem);

module.exports = router;