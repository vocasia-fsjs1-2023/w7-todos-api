const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());

// Database sederhana menggunakan array
let todos = [];

// Endpoints
app.get('/todos', (req, res) => {
  res.json({ todos });
});

app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    description,
    status: 'created',
    created_at: new Date(),
    updated_at: new Date()
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id == id);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], title, description, updated_at: new Date() };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id == id);
  if (todoIndex !== -1) {
    todos[todoIndex].status = status;
    todos[todoIndex].updated_at = new Date();
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todoIndex = todos.findIndex(todo => todo.id == id);
  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.json({ message: `Todo with id ${id} successfully deleted`, deletedTodo });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})