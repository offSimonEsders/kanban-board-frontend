import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {Todo} from '../../modules/task';
import {CdkDrag} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule, CdkDrag],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() todo?: Todo;
  @Output() infoTodo = new EventEmitter<Todo>();
  protected readonly JSON = JSON;
}
