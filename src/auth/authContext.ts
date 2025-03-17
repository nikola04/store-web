import { createContext } from 'react';
import { User } from '../types/user';

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: User | null;
    csrfToken: string | null;
    login: (user: User, accessToken: string, csrfToken: string) => void;
    logout: () => void;
    updateCsrfToken: (csrfToken: string) => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
