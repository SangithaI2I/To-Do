import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoHeader } from './header/header';
import { Sidebar } from './sidebar/sidebar.component';
import { TaskComponent } from './task/task.component';
import { SubTaskComponent } from './sub-task/sub-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoHeader,
    Sidebar,
    TaskComponent,
    SubTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
