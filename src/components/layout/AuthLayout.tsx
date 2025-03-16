import { Outlet } from "react-router";

function AuthLayout(){
    return <div className="relative bg-background w-screen max-w-full h-screen flex justify-center items-center">
        <div className="w-full max-w-[360px] rounded-lg overflow-hidden shadow-sm mx-2">
            <Outlet />
        </div>
    </div>
}

export default AuthLayout;
