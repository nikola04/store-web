import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { LOGIN_PATH } from "../../constants/locations";
import Loader from "../loader";


function ProtectedRoute({ children }: {
    children: React.ReactElement;
}){
    const auth = useAuth();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search.toString());
    searchParams.append('redirect', location.pathname.toString());
    const path = `${LOGIN_PATH}?${searchParams.toString()}`;
    
    if(auth.isLoading) 
        return <Loader />
    if(!auth.isLoggedIn)
        return <Navigate to={path} replace/>
    return children;
}

export default ProtectedRoute;
