import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {CommonModule} from "@angular/common";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CardComponent} from "./card/card.component";
import {Todo} from "../modules/todo";
import {BackendService} from "../services/backend.service";
import {TodoInfoComponent} from "./todo-info/todo-info.component";
import {CreateTodoComponent} from "./create-todo/create-todo.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, CardComponent, DragDropModule, TodoInfoComponent, CreateTodoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  shownav: boolean = false;
  todos: Todo[] = []; //[new Task('1', 0, 'todo', 'asdfg'), new Task('2', 1, 'todo', 'asdgrrdgd'), new Task('5', 1, 'done', '894jj'), new Task('6', 1, 'awaitfeedback', 'ajnjkjkr12')];
  todo: Todo[] = [];
  inprogress: Todo[] = [];
  awaitfeedback: Todo[] = [];
  done: Todo[] = [];

  infoTodo?: Todo;
  openCreateTask: boolean = false;

  tasksMap = {
    todo: [],
    inprogress: [],
    awaitfeedback: [],
    done: []
  }

  constructor(public backenService: BackendService) {
  }

  async ngOnInit() {
    let resp = await this.backenService.getTodos();
    this.todos = await resp.json();
    console.log(this.todos)
    this.filterTasks();
  }

  getUsername() {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).username;
    }
  }

  toggleNav() {
    this.shownav = !this.shownav;
  }

  filterTasks() {
    this.todo = this.todos.filter((task: Todo) => {
      return task.state === 'todo'
    }).sort((a, b) => a.index - b.index);
    this.inprogress = this.todos.filter((task: Todo) => {
      return task.state === 'inprogress'
    }).sort((a, b) => a.index - b.index);
    this.awaitfeedback = this.todos.filter((task: Todo) => {
      return task.state === 'awaitfeedback'
    }).sort((a, b) => a.index - b.index);
    this.done = this.todos.filter((task: Todo) => {
      return task.state === 'done'
    }).sort((a, b) => a.index - b.index);
  }

  drop(event: any, droplist: string) {
    const task = JSON.parse(event.item.data);
    const index = this.todos.findIndex((t: Todo) => {
      return t.id === task.id;
    });
    const taskNewState: Todo = this.changeContainer(task, droplist, index);
    this.callChangeIndexDependingOnState(taskNewState, event.currentIndex);
    this.filterTasks();
    this.updateTodos();
  }

  changeContainer(item: Todo, newContainerId: string, indexInTasks: number) {
    this.todos[indexInTasks].state = newContainerId;
    return this.todos[indexInTasks];
  }

  callChangeIndexDependingOnState(taskNewState: Todo, currentIndex: number) {
    switch (taskNewState.state) {
      case 'todo':
        this.todos = this.changeIndexes(taskNewState, currentIndex, this.todos, this.todo);
        break;
      case 'inprogress':
        this.todos = this.changeIndexes(taskNewState, currentIndex, this.todos, this.inprogress);
        break;
      case 'awaitfeedback':
        this.todos = this.changeIndexes(taskNewState, currentIndex, this.todos, this.awaitfeedback);
        break;
      case 'done':
        this.todos = this.changeIndexes(taskNewState, currentIndex, this.todos, this.done);
        break;
    }
  }

  changeIndexes(task: Todo, newIndex: number, mainTasksArray: Todo[], taskArrayToEdit: Todo[]) {
    taskArrayToEdit = this.removeFromTaskArray(taskArrayToEdit, task);
    let seperatedTasks: Todo[] = taskArrayToEdit.slice(newIndex, taskArrayToEdit.length);
    taskArrayToEdit = this.removeSeperateTasksFromTaskArray(seperatedTasks, taskArrayToEdit);
    taskArrayToEdit.push(task);
    taskArrayToEdit = taskArrayToEdit.concat(seperatedTasks);
    mainTasksArray = this.changeIndexAndReplaceInMainArray(taskArrayToEdit, mainTasksArray);
    return mainTasksArray;
  }

  removeFromTaskArray(taskArrayToEdit: Todo[], task: Todo) {
    const index = taskArrayToEdit.findIndex((t: Todo) => {
      return t.id === task.id
    });
    if (index !== -1) {
      taskArrayToEdit.splice(index, 1);
    }
    return taskArrayToEdit;
  }

  removeSeperateTasksFromTaskArray(seperatedTasks: Todo[], taskArrayToEdit: Todo []) {
    seperatedTasks.forEach((t: Todo) => {
      taskArrayToEdit.splice(taskArrayToEdit.findIndex((t2: Todo) => {
        return t.id === t2.id;
      }), 1);
    });
    return taskArrayToEdit;
  }

  changeIndexAndReplaceInMainArray(taskArrayToEdit: Todo[], mainTasksArray: Todo []) {
    taskArrayToEdit.forEach((t: Todo, index: number) => {
      t.index = index;
      mainTasksArray.forEach((t2: Todo) => {
        if (t2.id === t.id) {
          t2.index = t.index;
        }
      });
    });
    return mainTasksArray;
  }

  showTodoInfo(todo: Todo) {
    this.infoTodo = todo;
  }

  closeTodoInfo() {
    this.infoTodo = undefined;
  }

  async updateTodos() {
    const resp = await this.backenService.updateTodos(this.todos);
  }

  toggleOpenCreateTask() {
    this.openCreateTask = !this.openCreateTask;
  }

  loadNewTodo(todo: Todo) {
    console.log(todo)
    this.todos.push(todo);
    this.filterTasks();
  }

  protected readonly JSON = JSON;
}
