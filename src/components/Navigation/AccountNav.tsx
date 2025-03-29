import { JSX, PropsWithChildren, useCallback } from "react";
import { LOCATION_PATH } from "../../constants/locations";
import { useLocation, useNavigate } from "react-router";
import { IconType } from "react-icons";
import { IoLockClosedOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";

type Item = {
    name: string;
    link: string;
    icon: IconType;
}
const items: Item[] = [{
    name: 'Profile',
    link: LOCATION_PATH.ACCOUNT.PAGE,
    icon: IoPersonOutline
}, {
    name: 'Settings',
    link: LOCATION_PATH.ACCOUNT.SETTINGS,
    icon: IoSettingsOutline
}, {
    name: 'Security',
    link: LOCATION_PATH.ACCOUNT.SECURITY.PAGE,
    icon: IoLockClosedOutline
}]

export default function AccountNav({ className, ...props }: PropsWithChildren<JSX.IntrinsicElements['div']>){
    const location = useLocation();
    const isActive = useCallback((link: string) => location.pathname.endsWith(link), [location.pathname]);
    return <div className={`fixed ${className}`} {...props}>
        <div className="py-6">
            { items.map((item, ind) => <NavItem key={ind} data={item} isActive={isActive(item.link)} />)}
        </div>
    </div>
}

function NavItem({ data, isActive }: {
    data: Item,
    isActive: boolean;
}){
    const navigate = useNavigate();
    const Icon = data.icon;
    const onClick = useCallback(() => navigate(data.link), [data.link, navigate])
    return <div onClick={onClick} className={`my-0.5 px-4 py-2.25 rounded-r-2xl hover:bg-primary-bg active:bg-primary/20 group transition-all cursor-pointer ${isActive && '!bg-primary' }`}>
        <div className={`flex items-center gap-2 text-text-base group-active:text-primary transition-all ${ isActive && '!text-text-alt' }`}>
            <Icon size={17} />
            <p className="text-sm">{ data.name }</p>
        </div>
    </div>
}
