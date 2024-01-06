const express = require('express');
const app = express();
const port = 3000; // Port yang akan digunakan oleh server

// Middleware untuk mengizinkan parsing JSON pada body request
app.use(express.json());

// Data todo disimpan dalam array
const todos = [
  {
    id: 1,
    title: "Create POST in TODO App",
    description: "Membuat API Post Pada Todos app untuk menambahkan todo list",
    status: "created",
    created_at: "2023-09-26",
    updated_at: "2023-09-26",
  },
];

// Middleware untuk menambahkan tanggal saat todo diupdate
app.use((req, res, next) => {
  req.timestamp = new Date().toISOString();
  next();
});

// Endpoint untuk menampilkan semua todo
app.get('/todos', (req, res) => {
  res.json({ todos });
});

// Endpoint untuk menambahkan todo baru
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  const id = todos.length + 1;
  const newTodo = {
    id,
    title,
    description,
    status: "created",
    created_at: req.timestamp,
    updated_at: req.timestamp,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Endpoint untuk mengubah data todo berdasarkanoden ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = {
      ...todos[todoIndex],
      title,
      description,
      updated_at: req.timestamp,
    };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Endpoint untuk mengubah status todo berdasarkan ID
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].status = status;
    todos[todoIndex].updated_at = req.timestamp;
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Endpoint untuk menghapus todo berdasarkan ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.json({ message: `Todo dengan id ${id} dan judul ${deletedTodo[0].title} berhasil dihapus` });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});