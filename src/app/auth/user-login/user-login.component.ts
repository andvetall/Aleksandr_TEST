import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./../../app.component.scss'],
})
export class UserLoginComponent implements OnInit{

  loginForm: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    this.submitted = true

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log(user)

    this.loginForm.reset();
  }
}
