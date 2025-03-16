import { Navigate } from "react-router";
import { useAuth } from "../../hooks/Auth";


function ProtectedRoute({ children }: {
    children: React.ReactElement;
}){
    const auth = useAuth();
    if(!auth.isLoggedIn)
        return <Navigate to="/auth/login" replace/>
    return children;
}

export default ProtectedRoute;
