import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserData } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./../../app.component.scss']
})

export class UserRegisterComponent implements OnInit{

  registered = false;
  registerForm: FormGroup = new FormGroup({});
  error: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
    ) {}

ngOnInit() {
  this.registerForm = this.fb.group({
    fullName: ['',  Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required] ]
  }, {
    validator: this.ConfirmedValidator('password', 'confirm_password')
  });
}

ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  };
}

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.registered = true;

    const newUser: UserData = {
      fullName: this.registerForm.value.fullName,
      userName: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    console.log(newUser);

    this.auth.signUp(newUser).subscribe((res: any) => {
      console.log(res);
      this.registerForm.reset();
      this.router.navigate(['/products']);
      this.registered = false;
    });

    // this.registerForm.reset()
  }

  get f(){
    return this.registerForm.controls;
  }

}
