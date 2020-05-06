import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, Observable } from 'rxjs';

export interface UserData {
  fullName?: string,
  userName?: string,
  email: string,
  password: string,
}

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {};

  signUp(userData: UserData): Observable<any> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, userData);
    }


  login(userData: UserData): Observable<any> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, userData);
  }

    private handleError(error: HttpErrorResponse) {
      const {message} = error.error.error
  
      switch (message) {
        case 'INVALID_EMAIL':
          this.error$.next('Invalid email')
          break
        case 'INVALID_PASSWORD':
          this.error$.next('Invalid password')
          break
        case 'EMAIL_NOT_FOUND':
          this.error$.next('Email not found')
          break
      }
  
      return throwError(error)
    }
    
}