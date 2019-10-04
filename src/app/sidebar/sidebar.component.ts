import { Component } from '@angular/core';
import { Key } from 'protractor';

@Component({
  selector: 'side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class Sidebar {
    status:boolean = false;
    toggleSidebar() {
        this.status = !this.status;
    }
    listCount:number = 0;
    lists: Object[] = [];

    /**
     * It check whether the List Name value is null and add that given list 
     * to set of list when enter is pressed using event.
     * It also bind corresponding list details and send it when list name is clicked to view.
     * @param {Event} e - Event created whenever keyup performed.
     */
    addList(Event) {
        if(Event.keyCode === 13  && Event.target.value != "") {
            var list = {
                id:this.listCount,
                name:Event.target.value,
                tasks:[],
                isFinished:false
            }
            this.lists[this.listCount] = list;
            this.listCount++;
            this.currentList = list;
            Event.target.value = "";
        }
    }
    currentList;

    /**
     * It will assign the selected list to global list.
     * @param list - list which is selected to add task
     */
    useList(list) {
        this.currentList = list;
        console.log(this.currentList);
    }

    /**It Dynamically change readonly status of input box
     * @param event - event created whenever double click the input field
     */
    changeReadOnly(event) {
        event.target.readOnly = !event.target.readOnly;
    }

    /**It Dynamically change readonly status of input box
     * @param event - event created whenever double click the input field
     */
    changeRead(event) {
        event.target.readOnly = true;
    }
}
