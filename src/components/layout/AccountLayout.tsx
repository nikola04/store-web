import { Outlet } from "react-router";
import { AccountNav, AccountTopNav } from "../navigation/AccountNav";

export default function AccountLayout(){
    return <div className="relative w-full">
        <AccountNav className="hidden lg:block w-56 xl:w-64" />
        <AccountTopNav className="block lg:hidden h-12" />
        <div className="pt-12 lg:pt-0 lg:ml-56 xl:ml-64">
            <div className="max-w-6xl px-4 md:px-6 lg:px-8 xl:px-10 mx-auto">
                <div className="max-w-4xl mx-auto lg:mx-0">
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
}
