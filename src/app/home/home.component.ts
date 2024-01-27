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

  tasksMap = {
    todo: [],
    inprogress: [],
    awaitfeedback: [],
    done: []
  }

  ngOnInit() {
    this.filterTasks();
  }

  toggleNav() {
    this.shownav = !this.shownav;
  }

  filterTasks() {
    this.todo = this.tasks.filter((task: Task) => {
      return task.state === 'todo'
    }).sort((a, b) => a.index - b.index);
    this.inprogress = this.tasks.filter((task: Task) => {
      return task.state === 'inprogress'
    }).sort((a, b) => a.index - b.index);
    this.awaitfeedback = this.tasks.filter((task: Task) => {
      return task.state === 'awaitfeedback'
    }).sort((a, b) => a.index - b.index);
    this.done = this.tasks.filter((task: Task) => {
      return task.state === 'done'
    }).sort((a, b) => a.index - b.index);
  }

  drop(event: any, droplist: string) {
    console.log(event.currentIndex) // index after drop
    //console.log(event.item.data); //drag data
    const task = JSON.parse(event.item.data);
    const index = this.tasks.findIndex((t: Task) => {
      return t.id === task.id;
    });
    const taskNewState: Task = this.changeContainer(task, droplist, index);
    this.tasks = this.changeIndexes(taskNewState, event.currentIndex, this.tasks, this.todo);
    this.filterTasks();
  }

  changeContainer(item: Task, newContainerId: string, indexInTasks: number) {
    this.tasks[indexInTasks].state = newContainerId;
    return this.tasks[indexInTasks];
  }

  changeIndexes(task: Task, newIndex: number, mainTasksArray: Task[], taskArrayToEdit: Task[]) {
    taskArrayToEdit = this.removeFromTaskArray(taskArrayToEdit, task);
    let seperatedTasks: Task[] = taskArrayToEdit.slice(newIndex, this.todo.length);
    taskArrayToEdit = this.removeSeperateTasksFromTaskArray(seperatedTasks, taskArrayToEdit);
    taskArrayToEdit.push(task);
    taskArrayToEdit = taskArrayToEdit.concat(seperatedTasks);
    mainTasksArray = this.changeIndexAndReplaceInMainArray(taskArrayToEdit, mainTasksArray);
    return mainTasksArray;
  }

  removeFromTaskArray(taskArrayToEdit: Task[], task: Task) {
    const index = taskArrayToEdit.findIndex((t: Task) => {
      return t.id === task.id
    });
    if (index !== -1) {
      taskArrayToEdit.splice(index, 1);
    }
    return taskArrayToEdit;
  }

  removeSeperateTasksFromTaskArray(seperatedTasks: Task[], taskArrayToEdit: Task []) {
    seperatedTasks.forEach((t: Task) => {
      taskArrayToEdit.splice(taskArrayToEdit.findIndex((t2: Task) => {
        return t.id === t2.id;
      }), 1);
    });
    return taskArrayToEdit;
  }

  changeIndexAndReplaceInMainArray (taskArrayToEdit: Task[], mainTasksArray: Task []) {
    taskArrayToEdit.forEach((t: Task, index: number) => {
      t.index = index;
      mainTasksArray.forEach((t2: Task) => {
        if (t2.id === t.id) {
          t2.index = t.index;
        }
      });
    });
    return mainTasksArray;
  }

  protected readonly JSON = JSON;
}
