const ToDoController = {
  getToDoListItems: async (req, res) => {
    const { page, limit } = req.params;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < todos.length) {
      results.next = {
        page: parseInt(page, 10) + 1,
        limit: parseInt(limit, 10),
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: parseInt(page, 10) - 1,
        limit: parseInt(limit, 10),
      };
    }

    results.results = todos.slice(startIndex, endIndex);

    res.json(results);
  },
};
