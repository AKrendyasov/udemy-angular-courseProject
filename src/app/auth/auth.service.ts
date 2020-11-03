import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
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
        .post<AuthService>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfiVfPggCJTv_86Hwidn3CxsV3vCcFrGk',
            params
        )
        .pipe(
            catchError(error=>{
              let errorMessage = 'Unknown error '
              switch (error?.error?.error?.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email already exists';
                  break;
              }
              return throwError(errorMessage)
            })
        );
  }
}
