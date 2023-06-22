const ToDoList = require("../models/ToDoList");

const ToDoController = {
  getToDoListItems: async (req, res) => {
    try {
      let toDo = ToDoList.find(
        {},
        {
          _id: 0,
          id: 1,
          todo: 1,
        }
      );

        toDo = toDo
          .skip(parseInt(req.params.page - 1) * parseInt(req.params.limit))
          .limit(parseInt(req.params.limit))
          .sort({ createdAt: 1 });

      const toDoList = await toDo.exec();
      console.log(toDoList);

      return res.status(200).json({
        success: true,
        data: toDoList,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  saveToDoItem: async (req, res) => {
    try {
      const toDo = req.query.toDo ? req.query.toDo.trim(): req.body.toDo.trim();
      const toDoList = new ToDoList();
      toDoList.todo = toDo;

      await toDoList.save();

      res.status(200).json({
        success: true,
        message: "Successfully saved to-do item",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  updateToDoItem: async (req, res) => {
    try {
      const id = req.query.id ? req.query.id : req.body.id;
      const toDo = req.query.toDo ? req.query.toDo.trim(): req.body.toDo.trim();

      let toDoList = await ToDoList.findOne({id});
      toDoList.todo = toDo;

      await toDoList.save();

      res.status(200).json({
        success: true,
        message: "Successfully updated to-do item",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  deleteToDoItem: async (req, res) => {
    try{
      const id = req.query.id ? req.query.id : req.body.id;

      await ToDoList.deleteOne({id}).exec();

      res.status(200).json({
        success: true,
        message: "Successfully deleted to-do item",
      });
    }catch(error){
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  }
};

module.exports = ToDoController;
