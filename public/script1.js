console.log("JS script file loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ACTIVE = "todos_list_active";
const TODOS_LIST_COMPLETE = "todos_list_complete";
const TODOS_LIST_DELETED = "todos_list_deleted";
const NEW_TODO_INPUT_ID = "new_todo_input_id";

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
                if(todos[key].status == "COMPLETE")
                    parentC.appendChild(todo_element);
                if(todos[key].status == "DELETED")
                    parentD.appendChild(todo_element);


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


    return todo_element;
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


