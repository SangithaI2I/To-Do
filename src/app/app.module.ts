import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoHeader } from './header/header';
import { Sidebar } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoHeader,
    Sidebar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
