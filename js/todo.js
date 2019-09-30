"use strict";

//Global variables
var menu = $('#menu');
var listItem = $('#listItem');
var taskSign = $('.taskSign');
var parentDiv = $('#taskDiv'); 
var input = $('#inputTask');
var taskPanel = $('#subTask');
var taskTitle = $('.subTaskTitleSpan');
var inputSubTask = $('#inputSubTask');

var tasks = [];
var subTasks = [];
var name;
var lists = [];
var currentListId = 0;
var currentTaskId = 0;
var id = 0;  

// calls initialization method
init();

/**
 * It intialize the methods which are required to invoke initially.
 */
function init() {
    menu.click(changeWidth);
    listItem.keyup(addList);
    input.keyup(addTask);
    inputSubTask.keyup(addSubTasks);
    $('#exit').click(changeTaskWidth);
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
    element.append(childElement);
}

/**
 * It Dynamically close and open sidebar when required.
 */
function changeWidth() {  
    $('.sideBarText').toggleClass("display");
    $('#sideBar').toggleClass("closeSideBar"); 
}

/**
 * It Dynamically close and open taskbar when required.
 */
function changeTaskWidth() {  
    $('#taskPanel').toggleClass("display"); 
}

/**
 * It check whether the input value is null and add that given Task 
 * to corresponding task list when enter is pressed using event.
 * It also bind corresponding task details and send it when task name is clicked to view.
 * @param {Event} e - Event created whenever keyup performed.
 */
function addTask(e) {     
    var todoTask = {};        
    if(e.keyCode == 13 && input.val() !="") {
        todoTask.id = id++;    
        todoTask.subTasks = [];    
        todoTask.status = false;  
        todoTask.name = input.val();             
        var existingTask = createTaskArea(todoTask, "task", parentDiv);
        lists[currentListId].tasks.push(todoTask);    
        existingTask.addEventListener("click",viewTaskDetails.bind(todoTask));                        
        input.val("");
    }  
}   

/**
 * It check whether the List Name value is null and add that given list 
 * to set of list when enter is pressed using event.
 * It also bind corresponding list details and send it when list name is clicked to view.
 * @param {Event} e - Event created whenever keyup performed.
 */
function addList(e) {
    if(e.keyCode == 13 && listItem.val() !="") {
        var taskList = $('#taskList'); 
        var list = {};
        var taskName = createElement("span");
        var taskDiv = createElement("div");
        list.name = listItem.val();
        taskList.addClass("taskDiv");   
        taskName.className = "taskName"; 
        taskName.innerHTML = list.name;
        taskDiv.innerHTML = '<i class="Icon listIcon"></i>';
        appendElement(taskDiv, taskName);
        appendElement(taskList, taskDiv);                  
        lists.push(list);
        list.id = lists.length-1;
        list.tasks = [];    
        list.status = false;
        taskDiv.addEventListener("click", viewTaskPage.bind(list)); 
        listItem.val("");
    }
} 

/**
 * It change the header name to corresponding task name clicked to view and 
 * set the current list id to corresponding task id.
 */       
function viewTaskPage() { 
    taskSign.text(this.name);
    currentListId = this.id;
    showTask(this); 
    
}

/**
 * It Display all task name existing in the corresponding task list. 
 * @param {Object} obj - Task List given to display tasks. 
 */
function showTask(obj) {
    parentDiv.html("");
    if(obj!=null) { 
        for(var i=0; i<(obj.tasks).length; i++) { 
            var existingTask = createTaskArea(obj.tasks[i], "task", parentDiv);          
            existingTask.addEventListener("click", viewTaskDetails.bind(obj.tasks[i]));                        
            input.val(""); 
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
    var checkedTask = divName+task.id;
    if(task.status) {
        $('#checkedTask').addClass("check");
    }
    else {
        $('#checkedTask').removeClass("check");
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
        taskTitle.addClass("check");
        $('#checkbox').prop("checked",true);
    }
    else {
       taskTitle.removeClass("check");
       $('#checkbox').prop("checked",false);
    }            
    console.log(this.name);
    taskTitle.text(this.name);    
    currentTaskId = this.id;
    showSubTask(this);
}

/**
 * It check whether the sub-task value is null and add that given sub-task 
 * to corresponding task when enter is pressed using event.
 * @param {Event} e - Event created whenever keyup performed.
 */
function addSubTasks(e) {
    var subTask = {};   
    var currentList = lists[currentListId];
    var currentTask = currentList.tasks[currentTaskId];
    if(e.keyCode == 13 && inputSubTask.val() !="") {
        subTask.name = inputSubTask.val();    
        subTask.id = id++;      
        subTask.status = false;                  
        currentTask.subTasks.push(subTask);         
        showSubTask(currentTask);
    } 
}

/**
 * It Display all sub-tasks existing in the corresponding task. 
 * @param {Object} obj - sub-task List given to display sub-task. 
 */
function showSubTask(task) {
    taskPanel.html("");
    if(task!=null) { 
        for(var i=0; i<(task.subTasks).length; i++) { 
            createTaskArea(task.subTasks[i], "subTask", taskPanel);
            inputSubTask.val(""); 
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
    var t = document.createTextNode(inputSubTask.val());
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
