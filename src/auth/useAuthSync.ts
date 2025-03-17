import { useEffect, useState, useCallback } from 'react';
import { User } from '../types/user';
import { getCurrentUser } from '../controllers/getCurrentUser';
import { CSRF_TOKEN, ACCESS_TOKEN } from '../constants/storage';

export const useAuthSync = (
    updateCsrfToken: (csrfToken: string) => void,
    updateUser: (user: User) => void
) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const syncUserData = useCallback(async () => {
        try {
            const user = await getCurrentUser();
            updateUser(user);
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                console.error('Aborted request:', err);
            }
            console.error(err);
        }finally{
            setIsLoading(false);
        }
    }, [updateUser]);

    useEffect(() => {
        setIsLoading(true);

        const csrfToken = localStorage.getItem(CSRF_TOKEN);
        if (csrfToken) updateCsrfToken(csrfToken);

        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) syncUserData();
    }, [syncUserData, updateCsrfToken]);

    return isLoading;
};
