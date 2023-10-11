const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const port = 3000;

// Data array untuk menyimpan TODOs
const todos = [];

// Generate ID untuk TODOs
let nextId = 1;

// Middleware untuk mencari TODO berdasarkan ID
function findTodoById(id) {
  return todos.find(todo => todo.id === id);
}

// POST /todos - Membuat TODO baru
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  const newTodo = {
    id: nextId,
    title,
    description,
    status: 'created',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  todos.push(newTodo);
  nextId++;

  res.status(201).json(newTodo);
});

// GET /todos - Mendapatkan semua TODOs
app.get('/todos', (req, res) => {
  res.status(200).json({ todos });
});

// PUT /todos/:id - Mengedit TODO berdasarkan ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  const todo = findTodoById(id);
  if (!todo) {
    return res.status(404).json({ message: 'TODO not found' });
  }

  todo.title = title;
  todo.description = description;
  todo.updated_at = new Date().toISOString();

  res.status(200).json(todo);
});

// PATCH /todos/:id - Mengubah status TODO berdasarkan ID
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const todo = findTodoById(id);
  if (!todo) {
    return res.status(404).json({ message: 'TODO not found' });
  }

  todo.status = status;
  todo.updated_at = new Date().toISOString();

  res.status(200).json(todo);
});

// DELETE /todos/:id - Menghapus TODO berdasarkan ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'TODO not found' });
  }

  todos.splice(index, 1);

  res.status(200).json({ message: `Todo dengan id ${id} berhasil dihapus` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
