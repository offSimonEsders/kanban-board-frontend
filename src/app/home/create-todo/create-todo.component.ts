import {Component, EventEmitter, Output} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {Todo} from "../../modules/todo";
import {CreateTodo} from "../../modules/create-todo";

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {
  @Output() close = new EventEmitter<boolean>();
  @Output() newTodo = new EventEmitter<Todo>();
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor(private backendService: BackendService) {
  }

  formGroup = new FormGroup ({
    title: this.title,
    description: this.description,
  });

  getErrorMessageTitle() {
    if (this.title.hasError('required')) {
      return 'Enter a title';
    }
    return '';
  }

  getErrorMessageDescription() {
    if (this.description.hasError('required')) {
      return 'Enter a description';
    }
    return '';
  }

  async createTodo() {
    if(this.title.value && this.description.value) {
      const todo: CreateTodo = new CreateTodo(this.title.value, this.description.value);
      const newTodo = await this.backendService.createTodo(todo);
      const data = await newTodo.json()
      this.newTodo.emit(data['created']);
      this.close.emit(true);
    }
  }
}
