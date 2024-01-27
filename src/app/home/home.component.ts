import {Component} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {CommonModule} from "@angular/common";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CardComponent} from "./card/card.component";
import {findIndex} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, CardComponent, DragDropModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  shownav: boolean = false;
  tasks: any;
  todos: Array<string> = ['1', '2'];
  inprogress: Array<string> = ['3', '4'];
  awaitfeedback: Array<string> = ['5'];
  done: Array<string> = ['6'];

  togglenav() {
    this.shownav = !this.shownav;
  }

  drop(event: any, droplist: string) {
    console.log(event.item)
    console.log(event.item.data); //drag data
    console.log(event.previousContainer.id)
    const task = event.item.data;
    const previousContainerId = event.previousContainer.id;
    this.removeFromPreviousContainer(task, previousContainerId);
    this.addToNewContainer(task, droplist);
  }

  removeFromPreviousContainer(item: string, previousContainerId: string) {
    switch (previousContainerId) {
      case 'todo':
        this.todos.splice(this.todos.indexOf(item), 1);
        break;
      case 'inprogress':
        this.inprogress.splice(this.todos.indexOf(item), 1);
        break;
      case 'awaitfeedback':
        this.awaitfeedback.splice(this.todos.indexOf(item), 1);
        break;
      case 'done':
        this.done.splice(this.todos.indexOf(item), 1);
        break;
    }
  }

  addToNewContainer(item: string, newContainerId: string) {
    switch (newContainerId) {
      case 'todo':
        this.todos.push(item);
        break;
      case 'inprogress':
        this.inprogress.push(item);
        break;
      case 'awaitfeedback':
        this.awaitfeedback.push(item);
        break;
      case 'done':
        this.done.push(item);
        break;
    }
  }

}
