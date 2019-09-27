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
var subTaskCheckBox = getElementById("checkbox");

var tasks = [];
var subTasks = [];
var name;
var lists = [];
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
function appendElement(element, childElement) {
    element.appendChild(childElement);
}

function changeWidth() {   
    if(sideBarText.style.display == "block") {
        sideBarText.style.display = "none";
        sidebar.classList.add("closeSideBar");
    } else {
        sideBarText.style.display = "block"; 
        sidebar.classList.remove("closeSideBar");
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
        todoTask.id = id++;    
        todoTask.subTasks = [];    
        todoTask.status = false;  
        todoTask.name = input.value;             
        todoTask.taskHead =taskSign.innerText; 
        var existingTask = createTaskArea(todoTask, "task", parent);
        lists[currentListId].tasks.push(todoTask);    
        existingTask.addEventListener("click", viewTaskDetails.bind(todoTask));                        
        input.value = "";
    }  
}
   

function addList() {
    let list = {};
    var taskName = createElement("span");
    var taskDiv = createElement("div");
    list.name = listItem.value;
    taskList.className="taskDiv";   
    taskName.className="taskName"; 
    taskName.innerHTML = list.name;
    taskDiv.innerHTML = '<i class="Icon listIcon"></i>';
    appendElement(taskDiv, taskName);
    appendElement(taskList, taskDiv);                  
    lists.push(list);
    list.id = lists.length-1;
    list.tasks = [];    
    list.status = false;
    taskDiv.addEventListener("click", viewTaskPage.bind(list)); 
    listItem.value="";
}   
       
function viewTaskPage() { 
    taskSign.innerText = this.name;
    currentListId = this.id;
    showTask(this); 
    
}

function showTask(obj) {
    parent.innerHTML = "";
    if(obj!=null) { 
        for(let i=0; i<(obj.tasks).length; i++) { 
            var existingTask = createTaskArea(obj.tasks[i], "task", parent);          
            existingTask.addEventListener("click", viewTaskDetails.bind(obj.tasks[i]));                        
            input.value = ""; 
        }  
    }         
}

function checkTaskStatus(divName ,task) {
    var checkedTask = getElementById(divName + task.id);
    if(task.status) {
        checkedTask.classList.add("check");
    }
    else {
        checkedTask.classList.remove("check");
    } 
    if(divName == "task") {   
        var view = viewTaskDetails.bind(task);   
        view();
    }             
}   
       
function viewTaskDetails() {
    if(this.status) {
        taskTitle.classList.add("check");
        subTaskCheckBox.checked = true;
    }
    else {
       taskTitle.classList.remove("check");
       subTaskCheckBox.checked = false;
    }            
    taskTitle.innerText = this.name;    
    currentTaskId = this.id;
    showSubTask(this);
}

function addSubTasks(e) {
    let subTask = {};   
    var currentList = lists[currentListId];
    var currentTask = currentList.tasks[currentTaskId];
    if(e.keyCode == 13 && inputSubTask.value !="") {
        subTask.name = inputSubTask.value;    
        subTask.id = id++;      
        subTask.status = false;               
        subTask.taskHead =taskTitle.innerText;    
        currentTask.subTasks.push(subTask);         
        showSubTask(currentTask);
    } 
}

function showSubTask(task) {
    taskPanel.innerHTML = "";
    if(task!=null) { 
        for(let i=0; i<(task.subTasks).length; i++) { 
            createTaskArea(task.subTasks[i], "subTask", taskPanel);
            inputSubTask.value = ""; 
        }  
    }         
}

function createTaskArea(task, divName, parentDiv, ) {
    var subParent = createElement("div");
    subParent.id = divName + task.id;
    subParent.className = "task-subParent"; 
    var t = document.createTextNode(inputSubTask.value);
    var existingSubTask = createElement("input");
    existingSubTask.type="button";
    existingSubTask.className ="existingTask";  
    var checkbox = createElement("input");
    checkbox.type="checkbox";
    if(divName == "task") {
        checkbox.className="task-checkbox";
    }
    else {
        checkbox.className="subtask-checkbox"; 
    }
    checkbox.id = "check";
    if(task.status) {
        checkbox.checked = true;
        subParent.classList.add("check"); 
    }
    var label = createElement("label");
    label.for =  "check";
    checkbox.addEventListener('change', function() { 
        task.status = this.checked;
        checkTaskStatus(divName, task);
    });
    existingSubTask.value= task.name;
    appendElement(subParent, label);
    appendElement(subParent, checkbox);       
    appendElement(subParent, existingSubTask);
    appendElement(parentDiv, subParent)
    return existingSubTask;
}
