import { useEffect, useState, useCallback } from 'react';
import { User } from '../types/user';
import { getCurrentUser } from '../controllers/getCurrentUser';
import { ACCESS_TOKEN } from '../constants/storage';

export const useAuthSync = (
    updateUser: (user: User) => void
) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const syncUserData = useCallback(async () => {
        try {
            const user = await getCurrentUser();
            updateUser(user);
        } catch (err) {
            console.error(err);
        }finally{
            setIsLoading(false);
        }
    }, [updateUser]);

    useEffect(() => {
        setIsLoading(true);

        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken && accessToken.length > 0) syncUserData();
        else setIsLoading(false);
    }, [syncUserData]);

    return isLoading;
};
