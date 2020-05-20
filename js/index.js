
const TICKER_DIV = '<div class="ticker"><i class="far fa-circle"></i></div>';
const DELETE_DIV = '<div class="delete"><i class="far fa-trash-alt"></i></div>';

var tasks = localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];
var taskItem = [];
var tasksID = [];


var render = function () {
    document.getElementById('list-items').innerHTML = "";
    for(var i=0; i<taskItem.length; i++) {
        document.getElementById('list-items').appendChild(taskItem[i]);
    }
}

var addTask = function(task) {
    var id = makeID();
    var li = document.createElement('li');

    li.innerHTML = TICKER_DIV + '<div class="content">' + task + '</div>' + DELETE_DIV;
    li.setAttribute('id', id);
    
    document.getElementById('list-items').appendChild(li);
    document.getElementById('close').click();

    taskItem.push(li);
    tasksID.push(id);
    tasks.push({id:id, name:task});

    localStorage.setItem('tasks', JSON.stringify(tasks));

    li.getElementsByClassName('delete')[0].onclick = () => {
        // user must confirm to delete
        var confirmation = confirm("Do you want to delete " + "'" + task + "' away from list?");

        if(confirmation) {
            deleteTask(id);
            var index = tasksID.indexOf(id);
            if(index > -1) {
                tasksID.splice(index, 1);
                taskItem.splice(index, 1);
            }
            else console.log('ko dc')
            render();
        }
    }

    li.getElementsByClassName('ticker')[0].onclick = () => {
        deleteTask(id);
        li.getElementsByClassName('ticker')[0].innerHTML = '<i class="fas fa-circle"></i>';
        li.getElementsByClassName('content')[0].style.textDecoration = "line-through";
        render();
    }
}

var deleteTask = function(id) {
    var index = -1;

    tasks.forEach((task, pos) => {
        if(task.id === id) index = pos;
    });

    if(index > -1)
        tasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

var checkTask = function() {
    var task = document.getElementById('task').value;
    if(task === "") {
        return;
    }
    addTask(task);

    document.getElementById('task').value = "";
}

var enterTask = function (event) {
    if(event.keyCode == 13) {
        document.getElementById('add-task').click();
    }
}

var makeID = function () {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    do {
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
    } while(tasksID.includes(result))
    
    return result;
 }


window.onload = function() {
    document.getElementById('list-items').innerHTML = "";
    render();

    var tempTasks = [];

    this.tasks.forEach(task => {
        tempTasks.push(task);
    });

    this.tasks = [];

    tempTasks.forEach(task => {
        addTask(task.name);
    });
};



document.getElementById('add-task').addEventListener('click', checkTask);
document.getElementById('task').onkeypress = enterTask;