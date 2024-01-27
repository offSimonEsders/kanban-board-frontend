import {Component} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  shownav: boolean = false;

  togglenav() {
    this.shownav = !this.shownav;
  }

}
