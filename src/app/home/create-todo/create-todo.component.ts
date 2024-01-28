import {Component, EventEmitter, Output} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {
  @Output() close = new EventEmitter<boolean>();
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  formGroup = new FormGroup ({
    title: this.title,
    description: this.description,
  })

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

}
