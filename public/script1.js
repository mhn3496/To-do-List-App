console.log("JS script file loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ACTIVE = "todos_list_active";
const TODOS_LIST_COMPLETE = "todos_list_complete";
const TODOS_LIST_DELETED = "todos_list_deleted";
const NEW_TODO_INPUT_ID = "new_todo_input_id";

var hideCompleted = true;
var hideDeleted = true;

window.onload = getTodosAJAX();
function addElements(todos_data_json){
    var todos = JSON.parse(todos_data_json);
    var parentA = document.getElementById(TODOS_LIST_ACTIVE);
    var parentC = document.getElementById(TODOS_LIST_COMPLETE);
    var parentD = document.getElementById(TODOS_LIST_DELETED);
    //parent.innerText = todos_data_json;
    parentA.innerHTML = "";
    parentC.innerHTML = "";
    parentD.innerHTML = "";

    if(parentA || parentC || parentD)
    {
        Object.keys(todos).forEach(
            function (key) {
               var todo_element = createTodoElement(key, todos[key]);
               if(todos[key].status == "ACTIVE")
                    parentA.appendChild(todo_element);
                if(todos[key].status == "COMPLETE" && hideCompleted == true )
                    parentC.appendChild(todo_element);
                if(todos[key].status == "DELETED" && hideDeleted == true)
                    parentD.appendChild(todo_element);


            }
        )
    }
}




function createTodoElement(id, todo_object)
{

    var item = document.createElement("div");
    item.setAttribute("class", "item");
    var component = document.createElement("span");
    component.setAttribute("class", "component");
    item.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );

    if(todo_object.status == "ACTIVE")
    {
        var complete = document.createElement("input");
        complete.setAttribute("type", "checkbox");
        complete.setAttribute('class','complete');
        complete.setAttribute("onclick", 'completeAJAX(' + id + ')');
        complete.setAttribute("id", 'del' + id);
        component.appendChild(complete);
    }

    if (todo_object.status == 'COMPLETE' )
    {
        var complete = document.createElement("input");
        complete.setAttribute("type", "checkbox");
        complete.setAttribute('checked','true');
        complete.setAttribute('disabled','disabled');
        component.appendChild(complete);

    }


    var todo = document.createElement("span");
    todo.innerText = todo_object.title;
    todo.setAttribute("id",id);
    todo.setAttribute("class","item todostatus"+todo_object.status);
    component.appendChild(todo);
    component.setAttribute(
        "data-id", id
    );

    component.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );
    component.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathHorizontal"
    );

    item.appendChild(component);


    if(todo_object.status != "DELETED")
    {
        var del =document.createElement("input");

        del.setAttribute("type", "image");
        del.setAttribute("src",'./images/delete.JPG');
        del.setAttribute("height", "10px");
        del.setAttribute("width", "10px");
        del.setAttribute("onClick", "deleteAJAX("+id+")");
        item.appendChild(del);
    }
    return item;
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

                addElements(xhr.responseText);
            }
            else
            {

                console.log(xhr.responseText);
            }
        }
    }



    xhr.send(data);

}


function getTodosAJAX() {
    //AJAX - xml HTTP request object
    //xhr - JS object for making request to servers via js
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos/", true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addElements(xhr.responseText)
            }
        }
    }

    xhr.send(data = null);
}

function completeAJAX(id)
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
                addElements(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}


function deleteAJAX(id)
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
                addElements(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}

function hideCompletedTodos()
{
    hideCompleted = !hideCompleted;
    getTodosAJAX();
}

function hideDeletedTodos()
{
    hideDeleted = !hideDeleted;
    getTodosAJAX();
}
