import { AuthAction } from './authReducer';
import { Dispatch, useCallback } from 'react';
import { ACCESS_TOKEN, CSRF_TOKEN } from '../constants/storage';
import { User } from '../types/user';

export const useAuthActions = (dispatch: Dispatch<AuthAction>) => {
    const login = useCallback((user: User, accessToken: string, csrfToken: string) => {
        dispatch({ type: 'LOGIN', payload: { user, csrfToken } });
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(CSRF_TOKEN, csrfToken);
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT', payload: null });
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(CSRF_TOKEN);
    }, [dispatch]);

    const updateCsrfToken = useCallback((csrfToken: string) => {
        dispatch({ type: 'UPDATE_CSRF', payload: { csrfToken } });
        localStorage.setItem(CSRF_TOKEN, csrfToken);
    }, [dispatch]);

    const updateUser = useCallback((user: User) => {
        dispatch({ type: 'UPDATE_USER', payload: { user } });
    }, [dispatch]);

    return { login, logout, updateCsrfToken, updateUser };
};
