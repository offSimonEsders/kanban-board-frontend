import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material/material.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide: boolean = true;

  constructor(private router: Router, private backendService: BackendService) {
  }

  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  customformGroup = new FormGroup({
    name: this.name,
    password: this.password
  });

  async login() {
    const userData: object = {
      'username': this.name.value,
      'password': this.password.value
    };
    this.router.navigate(['home']);
  }

  goToSignUp(event: Event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }

  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('email') ? 'Not a valid usersname' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    if(this.password.hasError('minlength')) {
      return 'The password should be at least 8 characters long'
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  changePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hide = !this.hide;
  }

}
