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
listItem.addEventListener("keyup", addList);
input.addEventListener("keyup",addTask);
inputSubTask.addEventListener("keyup",addSubTasks);
getElementById("exit").addEventListener("click", viewTaskDetails);

/**
 * It get Object using id and return it.
 * @param {String} id - Id of element to return.
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 * It get element using class name and return it
 * @param {String} className - name of the class applied to that corresponding element. 
 * @param {int} index - index of element .
 */
function getElementByClass(className,index) {
    return document.getElementsByClassName(className)[index];
}     

/**
 * It get new element name and create that element and return it.
 * @param {String} element - Element need to create.
 */
function createElement(element) {
    return document.createElement(element);
}

/**
 * It append the child element with parent element.
 * @param {String} element - parent element 
 * @param {String} childElement - child element to append with parent element
 */
function appendElement(element, childElement) {
    element.appendChild(childElement);
}

/**
 * It Dynamically close and open sidebar when required.
 */
function changeWidth() {   
    if(sideBarText.style.display == "block") {
        sideBarText.style.display = "none";
        sidebar.classList.add("closeSideBar");
    } else {
        sideBarText.style.display = "block"; 
        sidebar.classList.remove("closeSideBar");
    }
}

/**
 * It check whether the input value is null and add that given Task 
 * to corresponding task list when enter is pressed using event.
 * It also bind corresponding task details and send it when task name is clicked to view.
 * @param {Event} e - Event created whenever keyup performed.
 */
function addTask(e) {             
    if(e.keyCode == 13 && input.value !="") {
        let todoTask = {};
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

/**
 * It check whether the List Name value is null and add that given list 
 * to set of list when enter is pressed using event.
 * It also bind corresponding list details and send it when list name is clicked to view.
 * @param {Event} e - Event created whenever keyup performed.
 */
function addList(e) {
    if(e.keyCode == 13 && listItem.value !="") {
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
}   

/**
 * It change the header name to corresponding task name clicked to view and 
 * set the current list id to corresponding task id.
 */
function viewTaskPage() { 
    taskSign.innerText = this.name;
    currentListId = this.id;
    showTask(this); 
    
}

/**
 * It Display all task name existing in the corresponding task list. 
 * @param {Object} obj - Task List given to display tasks. 
 */
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

/**
 * It Check the task status whether checked or not and apply
 * strike to the task when it is checked and vice-versa
 * @param {*} divName - element name to apply or remove strike when it is checked or not respectively.
 * @param {*} task - task given to check status checked or not.
 */
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

/**
 * It Check the sub-task status whether checked or not and apply
 * strike to the sub-task when it is checked and vice-versa
 */
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

/**
 * It check whether the sub-task value is null and add that given sub-task 
 * to corresponding task when enter is pressed using event.
 * @param {Event} e - Event created whenever keyup performed.
 */
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

/**
 * It Display all sub-tasks existing in the corresponding task. 
 * @param {Object} obj - sub-task List given to display sub-task. 
 */
function showSubTask(task) {
    taskPanel.innerHTML = "";
    if(task!=null) { 
        for(let i=0; i<(task.subTasks).length; i++) { 
            createTaskArea(task.subTasks[i], "subTask", taskPanel);
            inputSubTask.value = ""; 
        }  
    }         
}

/**
 * It Create Elements and set the values to element and append
 * it properly to show task and sub-task details.
 * @param {Object} task - Task given to show. 
 * @param {String} divName - Prefix of Division id 
 * @param {String} parentDiv - Parent Division to perform append operation. 
 */
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
