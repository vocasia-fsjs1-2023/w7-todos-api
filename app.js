const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;

const todos = [];
let idCounter = 1;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/todos", (req, res) => {
  res.status(200).json({ todos });
});

app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  const id = idCounter++;
  const newTodo = {
    id,
    title,
    description,
    status: "created",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = {
      ...todos[todoIndex],
      title,
      description,
      status,
      updated_at: new Date().toISOString(),
    };
    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.patch("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].status = status;
    todos[todoIndex].updated_at = new Date().toISOString();
    res.status(200).json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.status(200).json({
      message: `Todo dengan ID ${id} berhasil dihapus`,
      todo: deletedTodo[0],
    });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
