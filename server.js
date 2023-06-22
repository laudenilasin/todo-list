require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require("./connect_to_mongodb");
const todoRoutes = require('./routes/todo.routes');
const app = express();

app.use(bodyParser.json());


app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectToDB();
    app.listen(PORT);
    console.log(`DB connected, server listening to port: ${PORT}`);
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err}`);
  }
})();