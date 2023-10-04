const express = require('express');
const boydParser = require('body-parser');

const app = express();
app.use(boydParser.urlencoded({extended: true}));

const perpustakaan = [];

app.get('/', function(req, res){
    res.send('<h2>Hello Word!</h2>');
});

let id = 1;

app.post('/todos', function(req, res){
    const body = req.body;

    const title = body.title;
    const status = 'tersedia';
    const description = body.description;
    const created_at = new Date();
    const updated_at = new Date();

    const todos = {
        id: id++,
        title: title,
        description: description,
        status: status,
        created_at: created_at,
        updated_at: updated_at
    }

    perpustakaan.push(todos);

    res.status(201).json(todos);
});

app.get('/todos', function(req, res){
    res.status(200).json(perpustakaan)

});

app.put('/todos/:id', function(req, res){
    const body = req.body;
    const param = req.params;

    const id = param.id;
    const new_title = body.title;

    let todos_edited;
    for(let i=0; i < perpustakaan.length;i++){
        if(perpustakaan[i].id == id){
            todos_edited = perpustakaan[i];
            todos_edited.title = new_title;
            perpustakaan[i] = todos_edited;
            console.log(perpustakaan);

        }

    }

    res.status(200).json(perpustakaan);
});

app.patch('/todos/:id', function(req, res){
    const body = req.body;
    const param = req.params;

    const id = param.id;
    const status = body.status;

    let todos_edited;
    for(let i=0; i < perpustakaan.length;i++){
        if(perpustakaan[i].id == id){
            todos_edited = perpustakaan[i];
            todos_edited.status = status;
            perpustakaan[i] = todos_edited;
            console.log(perpustakaan);

        }

    }

    res.status(200).json(perpustakaan);
});

app.delete('/todos/:id', function(req, res){
    const param = req.params;

    const id = param.id;

    let index;
    for(let i=0; i < perpustakaan.length;i++){
        if(perpustakaan[i].id == id){
            index = i;
        }

    }

    perpustakaan.splice(index, 1);

    res.status(200).json(perpustakaan);
});

app.listen(3000, function(){
    console.log(`The server run on port 3000`);
});