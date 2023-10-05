const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;

//POST Method
const array = [];
let identity = 1;
app.post("/todos", (req, res) => {
  const body = req.body;

  const id = identity++;
  const title = body.title;
  const description = body.description;
  const status = "created";
  const created_at = new Date();
  const update_at = new Date();

  const todo = {
    id,
    title,
    description,
    status,
    created_at,
    update_at,
  };
  array.push(todo);
  res.status(201).json(array);
});

//GET method
app.get("/todos", (req, res) => {
  const listTodos = { todos: array };
  res.status(200);
  res.json(listTodos);
});

//PUT method
app.put("/todos/:id", (req, res) => {
  const body = req.body;
  const param = req.params;

  const id = param.id;
  const newTitle = body.title;
  const newDescription = body.description;
  const update_at = new Date();

  let updated;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      updated = array[i];

      updated.title = newTitle;
      updated.description = newDescription;
      updated.update_at = update_at;

      array[i] = updated;
    }
  }
  res.status(200).json(array);
});

//PATCH method
app.patch("/todos/:id", (req, res) => {
  const body = req.body;
  const param = req.params;

  const id = param.id;
  const status = body.status;
  const update_at = new Date();

  let updated;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      updated = array[i];

      updated.status = status;
      updated.update_at = update_at;

      array[i] = updated;
    }
  }
  res.status(200).json(array);
});

//DELETE method
app.delete("/todos/:id", (req, res) => {
  const param = req.params;

  const id = param.id;

  let deleted;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      deleted = i;
    }
  }
  array.splice(deleted, 1);
  let msg = {
    message:
      "todo dengan id 1 dan judul Create PUT in TODO App berhasil dihapus",
  };
  res.status(200).json(msg);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
