import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public todoListItems: string[] = [];

  addNewItem(task) {
    this.todoListItems.push(task);
  }

  deleteTodoItem(task) {
    this.todoListItems = this.todoListItems.filter(item => item !== task);
  }
}
