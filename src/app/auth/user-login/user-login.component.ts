import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserData } from 'src/app/shared/interfaces/interfaces';

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
    private toastr: ToastrService,
    private router: Router
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
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;

    const user: UserData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log(user);

    this.auth.login(user).subscribe((res: any) => {
      console.log(res);
      this.loginForm.reset();
      this.router.navigate(['/products']);
      this.submitted = false;
    });

  }
}
