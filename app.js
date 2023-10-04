const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const todos = [];

// Create a new TODO
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
    const status = 'created';
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const newTodo = { id, title, description, status, created_at, updated_at };
    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// Read all TODOs
app.get('/todos', (req, res) => {
    res.status(200).json({ todos });
});

// Update a TODO by ID
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'TODO not found' });
    }

    todos[index].title = title;
    todos[index].description = description;
    todos[index].updated_at = new Date().toISOString();

    res.json(todos[index]);
});

// Update the status of a TODO by ID
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'TODO not found' });
    }

    todos[index].status = status;
    todos[index].updated_at = new Date().toISOString();

    res.json(todos[index]);
});

// Delete a TODO by ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'TODO not found' });
    }

    const deletedTodo = todos.splice(index, 1)[0];

    res.json({
        message: `Todo dengan id ${id} dan judul ${deletedTodo.title} berhasil dihapus`,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
