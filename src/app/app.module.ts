import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { StartPageComponent } from './start-page/start-page.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './auth/auth.guard';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot({
      preventDuplicates: false
    })
  ],
  exports: [
  ],
  providers: [INTERCEPTOR_PROVIDER, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
