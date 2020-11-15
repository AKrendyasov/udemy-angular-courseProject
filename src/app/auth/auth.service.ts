import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { UserModel } from './user.model';

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
    user = new Subject<UserModel>();

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
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
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

    private handleAuthentication(email: string, userId: string, token: string, expiresAfter: number) {
        const expirationDate = new Date(new Date().getTime() + expiresAfter * 1000);
        const user = new UserModel(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error ';
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
        return throwError(errorMessage);

    }
}
