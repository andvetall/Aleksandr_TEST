import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';




@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./../../app.component.scss']
})

export class UserRegisterComponent implements OnInit{
  
  registered = false;
  registerForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) { }

ngOnInit() {
  this.registerForm = this.fb.group({
    fullName: ['',  Validators.required],
    userName:['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required] ]
  }, { 
    validator: this.ConfirmedValidator('password', 'confirm_password')
  })
};

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
  }
};

  register() {
    this.registered = true

    const newUser = {
      fullName: this.registerForm.value.fullName,
      userName: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirm_password: this.registerForm.value.confirm_password
    };

    console.log(newUser)

    this.registerForm.reset();
  };

  get f(){
    return this.registerForm.controls;
  };
  
}
