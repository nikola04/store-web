import { Outlet } from "react-router";
import AccountNav from "../navigation/AccountNav";

export default function AccountLayout(){
    return <div className="relative w-full">
        <AccountNav className="w-64" />
        <div className="ml-64">
            <div className="max-w-6xl px-10 mx-auto">
                <div className="max-w-4xl">
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
}
