import { useContext } from "react";
import { AuthContext } from "../providers/Auth";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be inside AuthProvider');
    }
    return context;
};
