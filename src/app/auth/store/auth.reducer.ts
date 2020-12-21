import { UserModel } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthStateStructure {
    user: UserModel;
    authError: string;
}

const initialState: AuthStateStructure = {
    user: null,
    authError: null,
}

export function authReducer(state: AuthStateStructure = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new UserModel(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.tokenExpirationDate,
            );

            return {
                ...state,
                authError: null,
                user: user,
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };

        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null
            };

        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
            };
        default:
            return state;
    }
}
