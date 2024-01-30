import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {Todo} from "../../modules/todo";
import {CreateTodo} from "../../modules/create-todo";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent implements OnInit {
  @Input() todo?: Todo;
  @Output() close = new EventEmitter<boolean>();
  @Output() newTodo = new EventEmitter<Todo>();
  //@Output() edit = new EventEmitter<Todo>
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    if (this.todo) {
      const title = this.todo?.title;
      const description = this.todo?.description;
      if (title && description) {
        this.formGroup.setValue({title: title, description: description});
      }
    }
  }

  formGroup = new FormGroup({
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

  createOrEditTodo() {
    if (!this.todo) {
      this.createTodo();
      return;
    }
    this.editTodo();
    return;
  }

  async createTodo() {
    if (this.title.value && this.description.value) {
      const todo: CreateTodo = new CreateTodo(this.title.value, this.description.value);
      const newTodo = await this.backendService.createTodo(todo);
      const data = await newTodo.json()
      this.newTodo.emit(data['created']);
      this.closePopup();
    }
  }

  editTodo() {
    this.sendDataToBackend();
    this.changeTodoDataAndClose();
  }

  sendDataToBackend() {
    if (this.title.value && this.description.value) {
      const data = {
        'id': this.todo?.id,
        'title': this.title.value,
        'description': this.description.value
      };
      this.backendService.editTodo(data);
    }
  }

  changeTodoDataAndClose() {
    if (this.todo && this.title.value && this.description.value) {
      this.todo.title = this.title?.value;
      this.todo.description = this.description.value;
      this.closePopup();
    }
  }

  closePopup() {
    this.close.emit(true);
  }

}
