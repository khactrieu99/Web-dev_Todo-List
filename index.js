var tasksID = [];
var taskItem = []

const TICKER_DIV = '<div class="ticker"><i class="far fa-circle"></i></div>';
const DELETE_DIV = '<div class="delete"><i class="far fa-trash-alt"></i></div>';


var render = function () {
    document.getElementById('list-items').innerHTML = "";
    for(var i=0; i<taskItem.length; i++) {
        document.getElementById('list-items').appendChild(taskItem[i]);
    }
}

var addTask = function(task) {
    var id = makeID();
    tasksID.push(id);

    var li = document.createElement('li');

    li.innerHTML = TICKER_DIV + '<div class="content">' + task + '</div>' + DELETE_DIV;
    li.setAttribute('id', id);
    
    document.getElementById('list-items').appendChild(li);
    document.getElementById('close').click();

    taskItem.push(li);

    li.getElementsByClassName('delete')[0].onclick = () => {
        var index = tasksID.indexOf(id);
        if(index > -1) {
            tasksID.splice(index, 1);
            taskItem.splice(index, 1);
        }
        else console.log('ko dc')
        render();
    }

    li.getElementsByClassName('ticker')[0].onclick = () => {
        var i = document.createElement('i');
        li.getElementsByClassName('ticker')[0].innerHTML = '<i class="fas fa-circle"></i>';
        li.getElementsByClassName('content')[0].style.textDecoration = "line-through";
        li.getElementsByClassName('delete')[0].style.visibility = "hidden";
        render();
    }
}

var checkTask = function() {
    var task = document.getElementById('task').value;
    if(task === "") {
        return;
    }
    addTask(task);

    document.getElementById('task').value = "";
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

document.getElementById('add-task').addEventListener('click', checkTask);