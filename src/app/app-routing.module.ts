import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { StartPageComponent } from './start-page/start-page.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'start', component: StartPageComponent },
  { path: 'login', component: UserLoginComponent
  },
  { path: 'register', component: UserRegisterComponent },
  { path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'start' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
