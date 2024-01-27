import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {CommonModule} from "@angular/common";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CardComponent} from "./card/card.component";
import {Task} from "../modules/task";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, CardComponent, DragDropModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  shownav: boolean = false;
  tasks: Array<Task> = [new Task('1', 0, 'todo', 'asdfg'), new Task('2', 1, 'todo', 'asdgrrdgd'), new Task('5', 1, 'done', '894jj'), new Task('6', 1, 'awaitfeedback', 'ajnjkjkr12')];
  todo: Task[] = [];
  inprogress: Task[] = [];
  awaitfeedback: Task[] = [];
  done: Task[] = [];

  ngOnInit() {
    this.filterTasks();
  }

  toggleNav() {
    this.shownav = !this.shownav;
  }

  filterTasks() {
    this.todo = this.tasks.filter((task: Task) => {
      return task.state === 'todo'
    });
    this.inprogress = this.tasks.filter((task: Task) => {
      return task.state === 'inprogress'
    });
    this.awaitfeedback = this.tasks.filter((task: Task) => {
      return task.state === 'awaitfeedback'
    });
    this.done = this.tasks.filter((task: Task) => {
      return task.state === 'done'
    });
  }

  drop(event: any, droplist: string) {
    //console.log(event.item.data) // index after drop
    //console.log(event.item.data); //drag data
    const task = JSON.parse(event.item.data);
    this.changeContainer(task, droplist);
  }

  changeContainer(item: Task, newContainerId: string) {
    const indexInTasks = this.tasks.findIndex((t: Task) => {
      return t.id === item.id;
    });
    this.tasks[indexInTasks].state = newContainerId;
    this.filterTasks();
  }

  changeIndexes() {

  }

  protected readonly JSON = JSON;
}
