import { ToastrService } from 'ngx-toastr';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(public toasterService: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(err => this.handleAuthError(err))
      );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    error = error.error.error;
    if (error.message === 'INVALID_EMAIL') {
        this.toasterService.error('Invalid Email');
        return of(false);
    }
    if (error.message === 'INVALID_PASSWORD') {
        this.toasterService.error('Invalid password');
        return of(false);
    }
    if (error.message === 'EMAIL_NOT_FOUND') {
        this.toasterService.error('Email not found');
        return of(false);
    }
    if (error.message === 'EMAIL_EXISTS') {
        this.toasterService.error('Email already exists');
        return of(false);
    }
    return throwError(error);
  }
}
