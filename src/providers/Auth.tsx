import { createContext, useReducer, useEffect, ReactNode } from 'react';
import { ACCESS_TOKEN, CSRF_TOKEN } from '../constants/storage';
import { User } from '../types/user';

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    csrfToken: string | null;
    login: (user: User, csrfToken: string) => void;
    logout: () => void;
    updateCsrfToken: (csrfToken: string) => void;
    updateUser: (user: User) => void;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    csrfToken: string | null;
}
type AuthAction =
  | { type: 'LOGIN'; payload: { user: User; csrfToken: string } }
  | { type: 'LOGOUT', payload: null }
  | { type: 'UPDATE_USER'; payload: { user: User } }
  | { type: 'UPDATE_CSRF'; payload: { csrfToken: string } };

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  csrfToken: null,
};

const AuthContext = createContext<AuthContextType|undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: (action.payload as { user: User }).user,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                csrfToken: null
            };
        case 'UPDATE_USER':
            return {
                ...state,
                isLoggedIn: true,
                user: (action.payload as { user: User }).user
            };
        case 'UPDATE_CSRF':
            return {
                ...state,
                csrfToken: (action.payload as { csrfToken: string }).csrfToken
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }: {
    children: ReactNode
}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user: User, csrfToken: string) => {
        dispatch({ type: 'LOGIN', payload: { user, csrfToken } });
        localStorage.setItem(CSRF_TOKEN, csrfToken);
    };
    
    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: null });
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(CSRF_TOKEN);
    };
    
    const updateCsrfToken = (csrfToken: string) => {
        dispatch({ type: 'UPDATE_CSRF', payload: { csrfToken } });
        localStorage.setItem(CSRF_TOKEN, csrfToken);
    };

    const updateUser = (user: User) => {
        dispatch({ type: 'UPDATE_USER', payload: { user } });
    };

    useEffect(() => {
        const csrfToken = localStorage.getItem(CSRF_TOKEN);
        if (csrfToken) {
            dispatch({ type: 'UPDATE_CSRF', payload: { csrfToken } });
        }
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if(accessToken) {
            // fetch /user/me
            // dispatch({ type: 'UPDATE_USER', payload: { user } });
        }
    }, []);

    return <AuthContext.Provider value={{ ...state, login, logout, updateCsrfToken, updateUser }}>
        {children}
    </AuthContext.Provider>
}

export { AuthProvider, AuthContext };
