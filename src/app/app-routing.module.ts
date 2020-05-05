import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';


const routes: Routes = [
  {
    path: 'login', component: UserLoginComponent
  },
  {
    path: 'register', component: UserRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
