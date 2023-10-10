const express = require('express')
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000

const ToDo = [];
let id = 1;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.post('/todos', (req, res) => {
    const body = req.body;
    const title = body.title;
    const description = body.description;
    const status = "created";

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedUpdatedDate = `${year}-${month}-${day}`;

    const todos = {
        id: id++,
        title: title,
        description: description,
        status: status,
        created_at: formattedUpdatedDate,
        updated_at: formattedUpdatedDate,
       };
   
       ToDo.push(todos);
       console.log(todos);
       res.status(201).json(todos);
   });

app.get("/todos", (req,res) => {
    res.status(200).json(ToDo);
});

app.put('/todos/:id', (req, res) => {
  const body = req.body;
  const param = req.params;

  const id = param.id;
  const new_title = body.title;
  const new_description = body.description;

  
  for ( let i = 0; i < ToDo.length; i++) {
      if (ToDo[i].id == id) {
          ToDo[i].title = new_title;
          ToDo[i].description = new_description;
          console.log(ToDo);
      }
  }

  res.status(200).json(ToDo);
});

app.patch('/todos/:id', (req, res) => {
  const body = req.body;
  const param = req.params;

  const id = param.id;
  const status = body.status;


  for ( let i = 0; i < ToDo.length; i++) {
      if (ToDo[i].id == id) {
          ToDo[i].status = status;

          console.log(ToDo);
      }
  }

  res.status(200).json(ToDo);
});

app.delete('/todos/:id', function(req, res){
  const param = req.params;

  const id = param.id;

  let index;
    for(let i=0; i < ToDo.length;i++){
        if(ToDo[i].id == id){
            index = i;
        }

    }

    ToDo.splice(index, 1);
    let message = {
      message : "Todo dengan id 1 dan judul Create PUT in TODO App berhasil dihapus"
    }

    res.status(200).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})