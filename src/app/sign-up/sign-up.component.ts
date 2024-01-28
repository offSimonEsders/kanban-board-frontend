import {Component, ViewChild} from '@angular/core';
import {MaterialModule} from "../material/material.module";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  hide: boolean = true;

  constructor(public router: Router, private backendService: BackendService) {
  }

  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.minLength(8)]);
  password2 = new FormControl('', [Validators.minLength(8), this.check.bind(this, this.password)]);

  customformGroup = new FormGroup({
    name: this.name,
    password: this.password,
    password2: this.password2
  });

  register() {
    const userData: object = {
      'username': this.name.value,
      'password': this.password.value
    }
    this.backendService.register(userData);
  }

  check(control: AbstractControl, control2: AbstractControl) : { check: true } | null {
    if(control.value === control2.value) {
      return null;
    }
    return {check: true};
  }

  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('name') ? 'Not a valid usersname' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.hasError('minlength')) {
      return 'The password should be at least 8 characters long'
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  getErrorMessagePassword2() {
    if (this.password2.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password2.hasError('minlength')) {
      return 'The password should be at least 8 characters long'
    }

    if(this.password2.hasError('check')) {
      return 'The passwords must match'
    }
    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  changePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hide = !this.hide;
  }

}
