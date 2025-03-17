import { User } from '../types/user';

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    csrfToken: string | null;
}

export type AuthAction =
    | { type: 'LOGIN'; payload: { user: User; csrfToken: string } }
    | { type: 'LOGOUT', payload: null }
    | { type: 'UPDATE_USER'; payload: { user: User } }
    | { type: 'UPDATE_CSRF'; payload: { csrfToken: string } };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                csrfToken: action.payload.csrfToken,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                csrfToken: null,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };
        case 'UPDATE_CSRF':
            return {
                ...state,
                csrfToken: action.payload.csrfToken,
            };
        default:
            return state;
    }
};
