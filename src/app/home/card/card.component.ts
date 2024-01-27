import {Component, Input} from '@angular/core';
import {MaterialModule} from "../../material/material.module";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data?: string;
}
