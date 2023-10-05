const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todoApp = [];
let id = 0;

//POST METHOD
app.post("/todos", (req, res) => {
  const body = req.body;
  //Input title dan description
  const title = body.title;
  const description = body.description;

  const todo = {
    id: id++,
    title: title,
    description: description,
    status: "created",
    created_at: new Date(),
    update_at: new Date(),
  };

  todoApp.push(todo);

  res.status(201).json(todo);
});

//GET METHOD
app.get("/todos", (req, res) => {
  res.status(200).json(todoApp);
});

//UPDATE METHOD
app.put("/todos/:id", (req, res) => {
  const param = req.params;
  const body = req.body;

  const id = param.id;
  //Update title, description dan tanggal update
  const newTitle = body.title;
  const newDescription = body.description;
  const newUpdateAt = new Date();

  let todo_edited;
  for (let i = 0; i < todoApp.length; i++) {
    if (todoApp[i].id == id) {
      todo_edited = todoApp[i];

      todo_edited.title = newTitle;

      //Kondisi jika kolom description diisi maka mengubah sesuai inputan, jika tidak akan mengembalikan default description
      if (newDescription) {
        todo_edited.description = newDescription; //Perubahan terjadi dari inputan Postman
      } else {
        todo_edited.description = "Mengubah todo tentang post menjadi PUT pada TODO App"; //Return default jika description tidak diisi value/uncheck pada Postman
      }

      todo_edited.update_at = newUpdateAt;

      todoApp[i] = todo_edited;
    }
  }

  res.status(200).json(todoApp);
});

//PATCH METHOD
app.patch("/todos/:id", (req, res) => {
  const body = req.body;
  const param = req.params;

  const id = param.id;
  //Update status menjadi in_progress atau done
  const newStatus = body.status;

  let todo_edited;
  for (let i = 0; i < todoApp.length; i++) {
    if (todoApp[i].id == id) {
      todo_edited = todoApp[i];

      todo_edited.status = newStatus;

      todoApp[i] = todo_edited;
    }
  }

  res.status(200).json(todoApp);
});

//DELETE METHOD
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  const index = todoApp.findIndex((item) => item.id == id);
  if (index === -1) {
    return res.status(404).json({ message: `Todo dengan ID ${id} tidak ditemukan!` });
  }

  const titleDeleted = todoApp[index].title;

  todoApp.splice(index, 1);

  res.status(200).json({
    message: `Todo dengan id ${id} dan judul ${titleDeleted} berhasil dihapus!`,
  });
});

app.listen(port, () => {
  console.log(`Started server at on port ${port}`);
});
