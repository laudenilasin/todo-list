require("dotenv").config();
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('../routes/todo.routes');
const ToDoList = require('../models/ToDoList');

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

app.use('/api/todos', router);

describe('Todo Routes', () => {
  beforeEach(async () => {
    await ToDoList.deleteMany();
  });

  test('GET /api/todos/:page/:limit should return a list of ToDo items', async () => {
    const todo1 = { todo: 'Task 1' };
    const todo2 = { todo: 'Task 2' };
    await ToDoList.create(todo1, todo2);

    const response = await request(app).get('/api/todos/1/10');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(2);
    expect(response.body.data[0].todo).toBe('Task 1');
    expect(response.body.data[1].todo).toBe('Task 2');
  });

  test('POST /api/todos should save a ToDo item', async () => {
    const todoItem = 'Task 1';

    const response = await request(app).post(`/api/todos?toDo=${todoItem}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Successfully saved to-do item');
  });

  test('PUT /api/todos should update a ToDo item', async () => {
    const todoItem = await ToDoList.create({ "toDo": 'Task 1' });

    const updatedTodoItem = 'Updated Task';

    const response = await request(app).put(`/api/todos?id=${todoItem.id}&toDo=${updatedTodoItem}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Successfully updated to-do item');
  });

  test('DELETE /api/todos should delete a ToDo item', async () => {
    const todoItem = await ToDoList.create({ "toDo": 'Task 1' });

    const response = await request(app).delete(`/api/todos?id=${todoItem.id}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Successfully deleted to-do item');
  });
});