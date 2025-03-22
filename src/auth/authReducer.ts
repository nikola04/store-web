import { User } from '../types/user';

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

export type AuthAction =
    { type: 'LOGIN'; payload: { user: User; } }
    | { type: 'LOGOUT', payload: null }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};
