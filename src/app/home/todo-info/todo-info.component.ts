import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {Todo} from "../../modules/todo";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-todo-info',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './todo-info.component.html',
  styleUrl: './todo-info.component.scss'
})
export class TodoInfoComponent {
  @Input() todo?: Todo;
  @Output() close = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();

  constructor(private backendService: BackendService) {
  }

  deleteTodo() {
    if(this.todo) {
      this.backendService.deleteTodo(this.todo);
      this.delete.emit(this.todo);
      this.closePopup();
    }
  }

  openEditTodo() {
    this.edit.emit(this.todo);
    this.closePopup();
  }

  closePopup() {
    this.close.emit(true);
  }

}
