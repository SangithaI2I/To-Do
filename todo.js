var menu = getElementById('menu');
var listItem = getElementById('listItem');
var taskSign = getElementByClass("taskSign",0);
var sideBarText = getElementByClass('sideBarText',0);
var parent = getElementById("taskDiv"); 
var input = getElementById("inputTask");
var taskList = getElementById("taskList"); 
var sidebar = getElementById("sideBar");
var taskPanel = getElementById("subTask");
var taskDetails = getElementById("taskDetails");
var taskTitle = getElementById("taskTitle");
var inputSubTask = getElementById("inputSubTask");


var tasks = [];
var subTasks = [];
var taskName;
var lists = [];
var listName;
var currentListId = 0;
var currentTaskId = 0;
var id = 0;
var taskHead;  

menu.addEventListener("click",changeWidth);
listItem.addEventListener("keyup", enterList);
input.addEventListener("keyup",addTask);
inputSubTask.addEventListener("keyup",addSubTasks);
getElementById("exit").addEventListener("click", viewTaskDetails);
        
function getElementById(id) {
    return document.getElementById(id);
}

function getElementByClass(className,index) {
    return document.getElementsByClassName(className)[index];
}     

function createElement(element) {
    return document.createElement(element);
}

function changeWidth() {
    
    if(sideBarText.style.display == "block") {
        sideBarText.style.display = "none";
        sidebar.style.width="3rem";
    } else {
        sideBarText.style.display = "block"; 
        sidebar.style.width="28rem";
    }
}


function enterList(e) {
    if(e.keyCode == 13 && listItem.value !="") {
        addList();
    }
}



function addTask(e) {     
    let todoTask = {};        
    if(e.keyCode == 13 && input.value !="") {
        todoTask.taskName = input.value;    
        todoTask.id = id++;    
        todoTask.subTasks = [];                   
        todoTask.taskHead =taskSign.innerText;    
        lists[currentListId].tasks.push(todoTask);         
        showTask(lists[currentListId]);
    }  
}
   

function addList() {
    let list = {};
    var taskName = createElement("span");
    var taskDiv = createElement("div");
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
    taskName.addEventListener("click", viewTaskPage.bind(list)); 
    console.log(list);       
    listItem.value="";
}   
       
function viewTaskPage() { 
    taskSign.innerText = this.listName;
    currentListId = this.id;
    showTask(this); 
    
}

function showTask(obj) {
    parent.innerHTML = "";
    if(obj!=null) { 
        for(let i=0; i<(obj.tasks).length; i++) { 
            var subParent = createElement("div");
            subParent.className = "task-subParent";       
            var t = document.createTextNode(input.value);    
            var existingTask = createElement("input");
            existingTask.type="button";
            existingTask.className ="existingTask";  
            existingTask.value= obj.tasks[i].taskName;
            var checkbox = createElement("input");
            checkbox.type="checkbox";
            checkbox.className="task-checkbox"; 
            checkbox.id = "check";
            var label = createElement("label");
            label.for =  "check";                
            checkbox.addEventListener( 'change', function() {
                if(this.checked==true) {
                    existingTask.className="existingTask check";
                }
                else{
                  existingTask.className="existingTask";  
                }
            });
            subParent.appendChild(label);
            subParent.appendChild(checkbox);       
            subParent.appendChild(existingTask);
            parent.appendChild(subParent);
            console.log(obj);   
            existingTask.addEventListener("click", viewTaskDetails.bind(obj.tasks[i]));                        
            input.value = ""; 
        }  
    }         
}

function viewTaskDetails() {
    console.log(taskPanel.style.display);
    taskPanel.style.width = "28rem";
    taskTitle.innerText = this.taskName;
    currentTaskId = this.id;
    showSubTask(this);
}

function addSubTasks(e) {
    let subTask = {};   
    var currentList = lists[currentListId];
    var currentTask = currentList.tasks[currentTaskId];
    console.log(currentTask);  
    if(e.keyCode == 13 && inputSubTask.value !="") {
        subTask.taskName = inputSubTask.value;    
        subTask.id = id++;                     
        subTask.taskHead =taskTitle.innerText;    
        currentTask.subTasks.push(subTask);         
        showSubTask(currentTask);
    } 
}

function showSubTask(task) {
    taskPanel.innerHTML = "";
    console.log(taskPanel);
    if(task!=null) { 
        for(let i=0; i<(task.subTasks).length; i++) { 
            var subParent = createElement("div");
            subParent.className = "task-subParent";       
            var t = document.createTextNode(inputSubTask.value);    
            var existingSubTask = createElement("input");
            existingSubTask.type="button";
            existingSubTask.className ="existingTask";  
            var checkbox = createElement("input");
            checkbox.type="checkbox";
            checkbox.className="subtask-checkbox"; 
            checkbox.id = "check";
            var label = createElement("label");
            label.for =  "check";                
            existingSubTask.value= task.subTasks[i].taskName;
            subParent.appendChild(label);
            subParent.appendChild(checkbox);       
            subParent.appendChild(existingSubTask);
            taskPanel.appendChild(subParent);
            console.log(task.subTasks[i].taskName);                          
            inputSubTask.value = ""; 
        }  
    }         
}
