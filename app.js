const express = require('express');
const boydParser = require('body-parser');

const app = express();
app.use(boydParser.urlencoded({extended: true}));

const dealer = [];

app.get('/', function(req, res){
    res.send('Hello Word!');
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
    dealer.push(todos);
    res.status(201).json(todos);
});

app.get('/todos', function(req, res){
    res.status(200).json(dealer)
});

app.put('/todos/:id', function(req, res){
    const body = req.body;
    const param = req.params;

    const id = param.id;
    const new_title = body.title;

    let todos_edited;
    for(let i=0; i < dealer.length;i++){
        if(dealer[i].id == id){
            todos_edited = dealer[i];
            todos_edited.title = new_title;
            dealer[i] = todos_edited;
            console.log(dealer);}}

    res.status(200).json(dealer);
});
app.patch('/todos/:id', function(req, res){
    const body = req.body;
    const param = req.params;

    const id = param.id;
    const status = body.status;

    let todos_edited;
    for(let i=0; i < dealer.length;i++){
        if(dealer[i].id == id){
            todos_edited = dealer[i];
            todos_edited.status = status;
            dealer[i] = todos_edited;
            console.log(dealer);
        }
    }

    res.status(200).json(dealer);
});

app.delete('/todos/:id', function(req, res){
    const param = req.params;
    const id = param.id;

    let index;
    for(let i=0; i < dealer.length;i++){
        if(dealer[i].id == id){
            index = i;
        }
    }
    dealer.splice(index, 1);
    res.status(200).json(dealer);
});
app.listen(3000, function(){
    console.log(`The server run on port 3000`);
});