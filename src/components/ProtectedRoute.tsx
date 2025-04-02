import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "./loader";
import { LOCATION_PATH } from "../constants/locations";
import { useEffect } from "react";


function ProtectedRoute({ children }: {
    children: React.ReactElement;
}){
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search.toString());
    searchParams.append('redirect', location.pathname.toString());
    const path = `${LOCATION_PATH.AUTH.LOGIN}?${searchParams.toString()}`;
    
    useEffect(() => {
        if(!auth.isLoading && !auth.isLoggedIn) navigate(path);
    }, [auth, navigate, path]);

    if(auth.isLoading) 
        return <div className="p-8">
            <Loader size="lg" />
        </div>
    if(!auth.isLoggedIn)
        return <Navigate to={path} replace/>
    return children;
}

export default ProtectedRoute;
