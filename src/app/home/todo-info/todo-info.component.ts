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

  constructor(private backendService: BackendService) {
  }

  deleteTodo() {
    if(this.todo) {
      this.backendService.deleteTodo(this.todo);
    }
  }

}
