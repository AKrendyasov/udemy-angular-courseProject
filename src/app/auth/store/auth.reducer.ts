import { UserModel } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthStateStructure {
    user: UserModel;
    authError: string;
    loading: boolean;
}

const initialState: AuthStateStructure = {
    user: null,
    authError: null,
    loading: false,
};

export function authReducer(state: AuthStateStructure = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
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
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };

        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true,
            };
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError: action.payload,
                loading: false,
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null,
            }
        default:
            return state;
    }
}
