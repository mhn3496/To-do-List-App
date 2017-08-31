console.log("JS script file loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ACTIVE = "todos_list_active";
const TODOS_LIST_COMPLETE = "todos_list_complete";
const TODOS_LIST_DELETED = "todos_list_deleted";
const NEW_TODO_INPUT_ID = "new_todo_input_id";

window.onload = getTodosAJAX();
function addTodoelements(id, todos_data_json){
    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    //parent.innerText = todos_data_json;
    parent.innerHTML = "";
    if(parent)
    {
        Object.keys(todos).forEach(
            function (key) {
                var todo_element = createTodoElement(key, todos[key]);
                parent.appendChild(todo_element);
            }
        )
    }
}

function createTodoElement(id, todo_object)
{
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    // HW: Read custom data-* attributes
    todo_element.setAttribute(
        "data-id", id
    );

    todo_element.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );


    if (todo_object.status == "ACTIVE"){

        var complete_button = document.createElement("button");
        complete_button.innerText = "Mark as Complete";
        complete_button.setAttribute("onclick", "completeTodoAJAX("+id+")");
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);

    }

    if(todo_object.status != "DELETED")
    {
        var delete_button = document.createElement("button");
        delete_button.innerText = "Mark as Deleted";
        delete_button.setAttribute("onClick", "deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }

    return todo_element;
}

function getTodosAJAX()
{
    //AJAX - xml HTTP request object
    //xhr - JS object for making request to servers via js
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/todos/active", true);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === RESPONSE_DONE)
        {
            if(xhr.status === STATUS_OK)
            {
                console.log(xhr.responseText);
                addTodoelements(TODOS_LIST_ACTIVE,xhr.responseText);
            }
        }
    }


    //xhr.send(data = null);

    xhr.open("GET", "/api/todos/complete", true);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === RESPONSE_DONE)
        {
            if(xhr.status === STATUS_OK)
            {
                console.log(xhr.responseText);
                addTodoelements(TODOS_LIST_COMPLETE,xhr.responseText);
            }
        }
    }


    xhr.send(data = null);

}


function addTodosAJAX()
{
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "todo_title="+ encodeURI(title);


    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == RESPONSE_DONE)
        {

            if(xhr.status == STATUS_OK)
            {

                addTodoelements(TODOS_LIST_ID, xhr.responseText);
            }
            else
            {

                console.log(xhr.responseText);
            }
        }
    }



    xhr.send(data);

}

function completeTodoAJAX(id)
{
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === RESPONSE_DONE)
        {
            if(xhr.status === STATUS_OK)
            {
                console.log(xhr.responseText);
                addTodoelements(TODOS_LIST_ID,xhr.responseText);
            }
        }
    }

    xhr.send(data);
}
function deleteTodoAJAX(id)
{
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=DELETED";
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === RESPONSE_DONE)
        {
            if(xhr.status === STATUS_OK)
            {
                console.log(xhr.responseText);
                addTodoelements(TODOS_LIST_ID,xhr.responseText);
            }
        }
    }

    xhr.send(data);
}

