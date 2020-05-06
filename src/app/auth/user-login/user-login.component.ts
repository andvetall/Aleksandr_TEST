import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./../../app.component.scss'],
})
export class UserLoginComponent implements OnInit{

  loginForm: FormGroup;
  submitted = false;
  error: any;

  constructor(
    public auth: AuthService,
    private toastr: ToastrService
  ) { }

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
    if(this.loginForm.invalid) {
      return
    };

    this.submitted = true

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log(user)

    this.auth.login(user.email, user.password).subscribe((res: any) => {
      console.log(res);      
      this.loginForm.reset()
      this.submitted = false
    }, (err) => {
      this.error = err.error.error.message;
      this.toastr.error(this.error)
    })

  }
}
