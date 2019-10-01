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
  addList(Event) {
    if(Event.keyCode === 13) {
    var list = {
      id:this.listCount,
      name:Event.target.value,
      isFinished:false
    }
    this.lists[this.listCount] = list;
    this.listCount++;
  }
}
}
