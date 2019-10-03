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
	  	if(event.key ===  "Enter") { 
		  	this.count = this.list.tasks.length;
			var task = {
				id:this.list.tasks.length,
				name:event.target.value,
				isFinished:false
			}
			this.list.tasks[this.count] = task;
	  	}
	  
	}
	
	/**
	 * It will Rename List title.
	 * @param event - Event created whenever keyup performed.
	 */
  	changeName(event) {
		if(event.key === "Enter") {
			this.list.name = event.target.value;
		}
  	}
}
