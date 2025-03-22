import { createContext } from 'react';
import { User } from '../types/user';

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: User | null;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
