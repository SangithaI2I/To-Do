import { Component, OnInit, Input} from '@angular/core';

@Component({
  
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
	@Input() list;
    count: number = 0;

	constructor() { }

	ngOnInit() {
	}

	/**
	 * It check whether the input value is null and add that given Task 
	 * to corresponding task list when enter is pressed using event.
	 * It also bind corresponding task details and send it when task name is clicked to view.
	 * @param {Event} e - Event created whenever keyup performed.
	 */
    addTask(event){
	  	if(event.target.value != "") { 
		  	this.count = this.list.tasks.length;
			var task = {
				id:this.list.tasks.length,
				name:event.target.value,
				subTasks:[],
				info:false,
				isFinished:false
			}
			this.list.tasks[this.count] = task;
			this.list.taskLength = this.getTaskLength();
			this.currentTask = task;
			event.target.value = "";
	  	}
	  
	}

	/**
	 * It return number of pending tasks in the list.
	 */
	getTaskLength(): number {
		return this.list.tasks.filter(task => task.isFinished === false).length;
	}
	
	currentTask;
	/**
	 * It assign task which is selected to current task.
	 * @param {Object} task - task which is clicked 
	 */
	useTask(task) {
		task.info = true;
		this.currentTask = task;
	}

	/**
	 * It Check whether the task is finished or not.
	 */
	checkStatus(task) {
		task.isFinished = !task.isFinished;
		this.list.taskLength = this.getTaskLength();
		this.list.tasks[task.id] = task;
		console.log(this.list);
	}
}
