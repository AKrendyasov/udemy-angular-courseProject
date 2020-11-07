import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  singUp(email: string, password: string) {
    const params = {
      email,
      password,
      returnSecureToken: true
    };
    return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfiVfPggCJTv_86Hwidn3CxsV3vCcFrGk',
            params
        )
        .pipe(
            catchError(this.handleError)
        );
  }
  login(email: string, password: string) {
    const params = {
      email,
      password,
      returnSecureToken: true
    };
    return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfiVfPggCJTv_86Hwidn3CxsV3vCcFrGk',
            params
        )
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError (error: HttpErrorResponse) {
      let errorMessage = 'Unknown error '
      switch (error?.error?.error?.message) {
          case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
              break;
          case 'EMAIL_NOT_FOUND':
              errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
              break;
          case 'INVALID_PASSWORD':
              errorMessage = 'The password is invalid or the user does not have a password';
              break;
          case 'USER_DISABLED':
              errorMessage = 'The user account has been disabled by an administrator';
              break;

      }
      return throwError(errorMessage)

  }
}
