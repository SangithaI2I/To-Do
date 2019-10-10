import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.scss']
})
export class SubTaskComponent implements OnInit {
    @Input() task;
    @Input() list;

    count: number = 0;
    constructor() { }

    ngOnInit() {
    }
    status:boolean=false;
    
    /**
     * It will Rename task title.
     * @param event - Event created whenever keyup performed.
     */
    changeTaskName(event) {
        if(event.target.value != "") {
            this.task.name = event.target.value;
        }
    }
    
    /**
     * It check whether the input value is null and add that given sub-task 
     * to corresponding task when enter is pressed using event.
     * @param {Event} e - Event created whenever keyup performed.
     */
    addTask(event){
        if(event.key ===  "Enter") { 
            this.count = this.task.subTasks.length;
            var subTask = {
                id:this.count,
                name:event.target.value,                
                isFinished:false
            }
            this.task.subTasks[this.count] = subTask;
            event.target.value = "";
            this.task.subTaskLength = this.getSubTaskLength();          
        }
    
    }

    /**
     * It Check whether the task is finished or not.
     */
    checkStatus(task) {
        task.isFinished = !task.isFinished;
        this.task = task;
    }
    
    /**
     * It Check whether the sub-task is finished or not.
     */
    checkSubTaskStatus(subTask) {
        subTask.isFinished = !subTask.isFinished;
        this.task.subTaskLength = this.getSubTaskLength();
    }
  
    /**
     * It close subTaskPanel.
     */
    closeSubTaskPanel(task) {
        task.info = !task.info;
        this.task = task;
    }

    /**
     *It changes the delete task status dynamically. 
     */
    deleteTaskStatus() {
        this.status = !this.status;
    }

    /**
     * It delete regarding subtask from task array.
     * @param task - task which consist that selected subtask to perform delete.
     */
    deleteTask(task) {
        this.list.tasks.splice(this.list.tasks.indexOf(task), 1);
        this.list.taskLength = this.list.tasks.length;
        console.log(this.list.tasks);
        this.deleteTaskStatus();       
        this.closeSubTaskPanel(task);
    }

    /**
	 * It return number of pending tasks in the list.
	 */
	getSubTaskLength(): number {
		return this.task.subTasks.filter(subTask => subTask.isFinished === false).length;
    }
    
    /**
     * It delete regarding subtask from task array.
     * @param task - task which consist that selected subtask to perform delete.
     */
    deleteSubTask(subTask) {
        console.log(this.list);
        this.task.subTasks.splice(this.task.subTasks.indexOf(subTask), 1);
        this.task.subTaskLength = this.task.subTasks.length;
    }
}
