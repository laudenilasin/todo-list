const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});