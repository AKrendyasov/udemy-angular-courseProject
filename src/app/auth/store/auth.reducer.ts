import { UserModel } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthStateStructure {
    user: UserModel;
}

const initialState: AuthStateStructure = {
    user: null,
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
                user: user,
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
