const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.urlencoded());
app.use(express.json());
const port = 3000;

const todos=[];
app.get('/', (req, res) => {
  res.send('Hello World!')
});

let id = 1;
app.post('/todos', (req, res) => {
    const status = "created";
    const updateDate = new Date();
    const updateYear = updateDate.getFullYear();
    const updateMonth = String(updateDate.getMonth() + 1).padStart(2, "0");
    const updateDay = String(updateDate.getDate()).padStart(2, "0");
    const newUpdateDate = `${updateYear}-${updateMonth}-${updateDay}`;

    const toDoList = {
     id: id++,
     title: req.body.title,
     description: req.body.description,
     status: status,
     created_at: newUpdateDate,
     updated_at: newUpdateDate,
    };

    todos.push(toDoList);
    res.status(201).json(toDoList);
});

app.get("/todos", (req,res) => {
    res.status(200).json({todos});
});

app.put('/todos/:id', (req, res) => {
    for ( let i = 0; i < todos.length; i++) {
        if (todos[i].id == req.params.id) {
            todos[i].title = req.body.title;
            todos[i].description = req.body.description;
        }
    }
    res.status(200).json(todos);
});

app.patch('/todos/:id', (req, res) => {
    const body = req.body;
    const param = req.params;

    const id = param.id;
    const status = body.status;
    for ( let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos[i].status = status;
        }
    }
    res.status(200).json(todos);
});

app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const index = todos.findIndex(todo => todo.id == todoId);
    if (index === -1) {
        return res.status(404).json({ error: `Todo dengan ID ${todoId} tidak ditemukan` });
    }
    const deleteTitle = todos[index].title;
    todos.splice(index, 1);
    res.status(200).json({ message: `Todo dengan ID ${todoId} dan judul ${deleteTitle} berhasil dihapus` });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

