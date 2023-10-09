const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const hostname = 'localhost';


app.use(bodyParser.json());

// Membuat array untuk menyimpan data sementara
let todos = [];

// End point untuk method post
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
    res.status(201).json({ message: 'Todo telah berhasil ditambahkan' });
    res.status(201).json(newTodo);
});

// End point untuk method get
app.get('/todos', (req, res) => {
    res.json({ todos });
});

// End point untuk method put
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id == id);
    if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], title, description, updated_at: new Date() };
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ error: 'Todo tidak ditemukan' });
    }
});

// End point untuk method patch
app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id == id);
    if (todoIndex !== -1) {
        todos[todoIndex].status = status;
        todos[todoIndex].updated_at = new Date();
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ error: 'Todo tidak ditemukan' });
    }
});

// End point untuk method delete
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id == id);
    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json({ message: `Todo dengan id : ${id} berhasil dihapus`, deletedTodo });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Membuat lokal server
app.listen(port, hostname, () => {
    console.log(`Server berjalan di http://${hostname}:${port}`);
});