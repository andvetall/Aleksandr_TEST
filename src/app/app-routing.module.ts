import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { StartPageComponent } from './start-page/start-page.component';


const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
