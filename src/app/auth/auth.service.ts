import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject, throwError, Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface UserData {
  fullName: string,
  userName: string,
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

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {};

  signUp(userData: UserData): Observable<any> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, userData);
    }


  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError.bind(this)),
        tap(resData => {
          this.handleAuthentication(
            resData.email, 
            resData.localId, 
            resData.idToken, 
            +resData.expiresIn 
          )
        })
      );
  }

  private handleAuthentication(
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number
    ) {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
      const user = new User(email, userId, token, expirationDate);  
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
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