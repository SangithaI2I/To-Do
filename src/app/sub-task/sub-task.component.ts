import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.scss']
})
export class SubTaskComponent implements OnInit {
    @Input() task;
    count: number = 0;
    constructor() { }

    ngOnInit() {
    }

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
		this.task.subTasks[subTask.id] = subTask;
  }
  
  /**
	 * It close subTaskPanel.
	 */
	closeSubTaskPanel(task) {
		task.info = !task.info;
		this.task = task;
    }
}
