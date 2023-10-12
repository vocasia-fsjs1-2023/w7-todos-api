const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;
app.use(express.json());

const todos = [];

app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  const id = todos.length + 1;
  const created_at = new Date().toISOString();
  const updated_at = created_at;

  const postTodo = { id, title, description, status: "created", created_at, updated_at };

  todos.push(postTodo);
  res.status(201).json(postTodo);
});

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  const todo = todos.find((item) => item.id === id);

  if (todo) {
    todo.title = title;
    todo.description = description;
    todo.updated_at = new Date().toISOString();
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: 'Data Tidak Ditemukan' });
  }
});

app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const todo = todos.find((item) => item.id === id);

  if (todo) {
    todo.status = status;
    todo.updated_at = new Date().toISOString();
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: 'Data Tidak Ditemukan' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = todos.findIndex((item) => item.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.status(200).json({ message: `Todos dengan id ${id} berhasil dihapus`});
  } else {
    res.status(404).json({ error: 'Data Tidak Ditemukan' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});