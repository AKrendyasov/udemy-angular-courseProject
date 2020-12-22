import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

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
/*    user = new BehaviorSubject<UserModel>(null);*/
    private tokenExpirationTimer: number

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppStateStructure>,
    ) {
    }
    autologin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }
        const loadedUser = new UserModel(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
/*            this.user.next(loadedUser);*/
            this.store.dispatch(new AuthActions.AuthenticateSuccess({
                email:loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                tokenExpirationDate: new Date(userData._tokenExpirationDate),
            }))

            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    logout() {
        this.store.dispatch(new AuthActions.Logout())
/*        this.user.next(null);*/
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresAfter: number) {
        const expirationDate = new Date(new Date().getTime() + expiresAfter * 1000);
        const user = new UserModel(email, userId, token, expirationDate);
        this.store.dispatch(new AuthActions.AuthenticateSuccess({
            email,
            userId,
            token,
            tokenExpirationDate: expirationDate
        }));
        /*        this.user.next(user);*/
        this.autoLogout(expiresAfter * 1000)
        localStorage.setItem('userData', JSON.stringify(user));
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
