import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "./loader";
import { LOCATION_PATH } from "../constants/locations";


function ProtectedRoute({ children }: {
    children: React.ReactElement;
}){
    const auth = useAuth();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search.toString());
    searchParams.append('redirect', location.pathname.toString());
    const path = `${LOCATION_PATH.AUTH.LOGIN}?${searchParams.toString()}`;
    
    if(auth.isLoading) 
        return <div className="p-8">
            <Loader size="lg" />
        </div>
    if(!auth.isLoggedIn)
        return <Navigate to={path} replace/>
    return children;
}

export default ProtectedRoute;
