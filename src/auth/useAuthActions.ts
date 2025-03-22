import { AuthAction } from './authReducer';
import { Dispatch, useCallback } from 'react';
import { ACCESS_TOKEN } from '../constants/storage';
import { User } from '../types/user';
import { logoutUser } from '../controllers/logoutUser';

export const useAuthActions = (dispatch: Dispatch<AuthAction>) => {
    const login = useCallback((user: User, accessToken: string) => {
        dispatch({ type: 'LOGIN', payload: { user } });
        localStorage.setItem(ACCESS_TOKEN, accessToken);
    }, [dispatch]);

    const updateUser = useCallback((user: User) => {
        dispatch({ type: 'LOGIN', payload: { user } });
    }, [dispatch])

    const logout = useCallback(async () => {
        localStorage.removeItem(ACCESS_TOKEN);
        await logoutUser();
        dispatch({ type: 'LOGOUT', payload: null });
    }, [dispatch]);

    return { login, logout, updateUser };
};
