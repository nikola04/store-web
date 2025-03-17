import { useReducer } from 'react';
import { authReducer, AuthState } from './../auth/authReducer';
import AuthContext from '../auth/authContext';
import { useAuthActions } from '../auth/useAuthActions';
import { useAuthSync } from '../auth/useAuthSync';

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    csrfToken: null,
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { login, logout, updateCsrfToken, updateUser } = useAuthActions(dispatch);
    const isLoading = useAuthSync(updateCsrfToken, updateUser);

    return (
        <AuthContext.Provider value={{ ...state, isLoading, login, logout, updateCsrfToken, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
