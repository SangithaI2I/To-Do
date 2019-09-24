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
var listItem = document.getElementById('listItem');
listItem.addEventListener("keyup", enterTask);

var taskSign = document.getElementsByClassName("taskSign")[0];
function enterTask(e) {
    if(e.keyCode == 13 && listItem.value !="") {
        console.log(e.keyCode);
        taskSign.innerText = listItem.value;
        addTask();
    }
}

var tasks = [];
var taskCount = 0;
var taskName;
var lists = [];
var listName;
var currentListId = 0;
var currentTaskId = 0;
var id = 0;
var taskHead;       
var parent = document.getElementById("taskDiv"); 
var input = document.getElementById("inputTask");
input.addEventListener("keyup",getNextTask);

function getNextTask(e) {     
    let todoTask = {};  
    var subParent = document.createElement("div");
    subParent.className = "task-subParent";    
    if(e.keyCode == 13 && input.value !="") { 
        todoTask.taskName = input.value;    
        todoTask.id = id++;                       
        todoTask.taskHead =taskSign.innerText;  
        var t = document.createTextNode(input.value);    
            let newList = lists[currentListId]   
            console.log(todoTask.taskHead); 
            newList.tasks.push(todoTask);
            console.log(newList.listName); 
            var li = document.createElement("input");
        li.type="button";
        li.className ="existingTask";
        if(newList.listName === todoTask.taskHead) {        
        for(let i=0; i<(newList.tasks).length; i++) {        
            li.value= newList.tasks[i].taskName;
        }
               }
        else {
            li.innerHTML="";
        }
 
        var checkbox = document.createElement("input");
        checkbox.type="checkbox";
        checkbox.className="task-checkbox"; 
        checkbox.id = "check";
        var label = document.createElement("label");
        label.for =  "check" ;
            subParent.appendChild(label);
            subParent.appendChild(checkbox);       
            subParent.appendChild(li);
            parent.appendChild(subParent);
            console.log(newList);
            taskCount++;               
            input.value = "";
            
    }
} 

var taskList = document.getElementById("taskList"); 
function addTask() {
    let list = {};
    var taskName = document.createElement("span");
    var taskDiv = document.createElement("div");
    list.listName = listItem.value;
    taskList.className="taskDiv";   
    taskName.className="taskName"; 
    taskName.innerHTML = list.listName;
    taskDiv.innerHTML = '<i class="Icon listIcon"></i>';
    taskDiv.appendChild(taskName);
    taskList.appendChild(taskDiv);
    lists.push(list);
    list.id = lists.length-1;
    list.tasks = [];
    listItem.value="";
    taskName.addEventListener("click", viewTaskPage.bind(list));        
}   
       
function viewTaskPage() { 
    document.getElementById("taskDiv").textContent= " ";
    taskSign.innerText = this.listName;
    currentListId = this.id;
    input.addEventListener("keyup",getNextTask.bind(this)); 
    
}
