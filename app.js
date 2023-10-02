const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

const ToDoList = [];

app.get("/", (req,res) => {
    res.send("Hello Word");
});

let id = 1;

app.post('/todos', (req, res) => {
    const body = req.body;
    const title = body.title;
    const description = body.description;
    const status = "created";

    const tanggal_updated = new Date();

    const updatedYear = tanggal_updated.getFullYear();
    const updatedMonth = String(tanggal_updated.getMonth() + 1).padStart(2, "0");
    const updatedDay = String(tanggal_updated.getDate()).padStart(2, "0");
    const formattedUpdatedDate = `${updatedYear}-${updatedMonth}-${updatedDay}`;

    const todos = {
     id: id++,
     title: title,
     description: description,
     status: status,
     created_at: formattedUpdatedDate,
     updated_at: formattedUpdatedDate,
    };

    ToDoList.push(todos);
    console.log(todos);
    res.status(201).json(todos);
});

app.get("/todos", (req,res) => {
    res.status(200).json(ToDoList);
});

app.put('/todos/:id', (req, res) => {
    const body = req.body;
    const param = req.params;

    const id = param.id
    const new_title = body.title;
    const new_description = body.description;

    for ( let i = 0; i < ToDoList.length; i++) {
        if (ToDoList[i].id == id) {
            ToDoList[i].title = new_title;
            ToDoList[i].description = new_description;
            console.log(ToDoList);
        }
    }

    res.status(200).json(ToDoList);
});

app.patch('/todos/:id', (req, res) => {
    const body = req.body;
    const param = req.params;

    const id = param.id
    const status = body.status


    for ( let i = 0; i < ToDoList.length; i++) {
        if (ToDoList[i].id == id) {


            ToDoList[i].status = status;



            console.log(ToDoList);
        }
    }

    res.status(200).json(ToDoList);
});

app.delete('/todos/:id', (req, res) => {
    const param = req.params;
    const id = param.id


    let index;
    let deletedTitle = "";
    for ( let i = 0; i < ToDoList.length; i++) {
        if (ToDoList[i].id == id) {
            index = i;
            deletedTitle = ToDoList[i].title; 
            break;
        }
    }

    if (index !== -1) {
        ToDoList.splice(index, 1);
        res.status(200).json({ message: `Todo dengan ID ${id} dan judul '${deletedTitle}' berhasil dihapus` });
    } 
});

app.listen(port, () => {
    console.log(`Example app listening on por ${port}`);
});