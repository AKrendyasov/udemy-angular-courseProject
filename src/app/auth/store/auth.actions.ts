import { Action } from '@ngrx/store';

export const SIGNUP_START = '[Auth] SIGNUP START'
export const LOGIN_START = '[Auth] LOGIN START';

export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE SUCCESS';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE FAIL';

export const LOGOUT = '[Auth] LOGOUT';

export const CLEAR_ERROR = '[Auth] CLEAR_ERROR'

export type AuthActions =
    | AuthenticateSuccess
    | Logout
    | LoginStart
    | AuthenticateFail
    | SignupStart
    | ClearError
    ;

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(
        public payload: {
            email: string,
            userId: string,
            token: string,
            tokenExpirationDate: Date,
        }
    ) {
    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: { email: string, password: string }) {
    }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) {
    }
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: { email: string, password: string }) {
    }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;

}
