var menu = document.getElementById('menu');
menu.addEventListener("click",changeWidth);
function changeWidth() {
    var sideBar = document.getElementsByClassName('sideBarText')[0];
    if(sideBar.style.display == "block") {
    sideBar.style.display = "none";
    document.getElementById("sideBar").style.width="4rem";
    } else {
       sideBar.style.display = "block"; 
       document.getElementById("sideBar").style.width="28rem";
   }
}
var task = document.getElementById('task');
task.addEventListener("keyup", enterTask);

var taskSign = document.getElementsByClassName("taskSign")[0];
function enterTask(e) {
    if(e.keyCode == 13 && task.value !="") {
        console.log(e.keyCode);
        taskSign.innerText = task.value;
        addTask();
    }
}

var tasks = [];
var todoTask = {};
var taskCount = 0;
function createTask(todoTask) {
    todoTask.taskCount= taskCount;
    todoTask.taskName = taskName;
}
    
var newTask = document.getElementById("inputTask").addEventListener("keyup",getNextTask);
function getNextTask(e) {   
    var parent = document.getElementById("taskDiv"); 
    var subParent = document.createElement("div");
    subParent.className = "task-subParent";
    var input = document.getElementById("inputTask");
    if(e.keyCode == 13 && input.value !="") { 
        todoTask.taskName = input.value;    
        todoTask.taskCount = taskCount;       
        var li = document.createElement("input");
        li.type="button";
        li.className ="existingTask";
        li.value= todoTask.taskName;
        var checkbox = document.createElement("input");
        checkbox.type="checkbox";
        checkbox.className="task-checkbox"; 
        checkbox.id = "check";
        var label = document.createElement("label");
            label.for =  "check" ;        
       
        var t = document.createTextNode(input.value);          
            tasks.push(todoTask);
            console.log(e.keyCode);
            console.log(li);
            subParent.appendChild(label);
            subParent.appendChild(checkbox);       
            subParent.appendChild(li);
            parent.appendChild(subParent);
            taskCount++;               
            console.log(todoTask);
            input.value = "";
            console.log(tasks);
    }
}  
function addTask() {
    var taskName = document.createElement("span");
    var taskDiv = document.createElement("div");
    var nextTask = task.value;
    var taskList = document.getElementById("taskList");
    taskList.className="taskDiv";   
    taskName.className="taskName"; 
    taskName.innerHTML = task.value;
    console.log(task.value);
    taskDiv.innerHTML = '<i class="Icon listIcon"></i>';
    taskDiv.appendChild(taskName);
    taskList.appendChild(taskDiv);
    task.value="";
    console.log(taskList);
    }           

