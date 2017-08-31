var express = require("express");
var todo_db = require("./seed.js");
var body_parser = require("body-parser");

var app = express();

app.use("/", body_parser.urlencoded({extended:false}) );
app.use("/", express.static(__dirname+ "/public"));


//HW: RESTful APIs

//1: GET all todos
//http://localhost:4000/todos/GET

//GET/todos
//Return a JSON object of all thise todos

app.get("/api/todos", function(req,res)
{
    res.json(todo_db.todos);
})

app.get("/api/todos/active", function(req,res)
{
    var obj = {};

    for(var item in todo_db.todos)
    {
        if(todo_db.todos[item].status == todo_db.StatusENUMS.ACTIVE) {
            obj[item] = todo_db.todos[item];
        }
    }
    res.send(obj);
})

app.get("/api/todos/complete", function(req,res)
{
    var obj = {};

    for(var item in todo_db.todos)
    {
        if(todo_db.todos[item].status == todo_db.StatusENUMS.COMPLETE) {
            obj[item] = todo_db.todos[item];
            //console.log("CP1");
        }
    }
    res.send(obj);
})

app.get("/api/todos/deleted", function(req,res)
{
    var obj = {};

    for(var item in todo_db.todos)
    {
        if(todo_db.todos[item].status == todo_db.StatusENUMS.DELETED) {
            obj[item] = todo_db.todos[item];
        }
    }
    res.send(obj);
})




app.delete("/api/todos/:id", function(req, res)
{
    var del_id = req.params.id;
    var todo  = todo_db.todos[del_id];
    if(!todo)
    {
        res.status(400).json({error: "Todo doesn't exist"});
    }

    else
    {
        todo.status = todo_db.StatusENUMS.DELETED;
        res.json(todo_db.todos);
    }
});




app.post("/api/todos", function(req,res)
{
    var todo = req.body.todo_title;


    if(!todo || todo == "" || todo.trim() == "")
    {
        res.status(400).json({error: "Todo title can't be empty"});
    }

    else
    {
        var new_todo_object = {
            title: req.body.todo_title,
            status :todo_db.StatusENUMS.ACTIVE
        };

        todo_db.todos[todo_db.next_todo_id++] = new_todo_object;
        res.json(todo_db.todos);
    }
});




app.put("/api/todos/:id", function(req, res)
{
    var mod_id = req.params.id;
    var todo  = todo_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error: "Todo doesn't exist"});
    }

    else
    {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title != "" && todo_title.trim() != ""){
            todo.title = todo_title;
        }

        var todo_status  =req.body.todo_status;
        if(todo_status &&
            (todo_status == todo_db.StatusENUMS.ACTIVE ||
                todo_status == todo_db.StatusENUMS.COMPLETE))
        {
            todo.status = todo_status;
        }

        res.json(todo_db.todos);
    }
});


app.put("/api/todos/complete/:id", function(req, res)
{
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error: "id doesn't exist"});
    }

    else
    {
        todo_db.todos[mod_id].status = todo_db.StatusENUMS.COMPLETE;
    }

    res.json(todo_db.todos);
});

app.put("/api/todos/active/:id", function (req, res)
{
    var mod_id = req.params.id;
    var todo  = todo_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error: "id doesn't exist"});
    }
    else
    {
        todo_db.todos[mod_id].status = todo_db.StatusENUMS.ACTIVE;
    }

    res.json(todo_db.todos);
});









app.listen(4000);