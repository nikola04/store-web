import { JSX, PropsWithChildren, useCallback } from "react";
import { LOCATION_PATH } from "../../constants/locations";
import { useLocation, useNavigate } from "react-router";
import { IconType } from "react-icons";
import { IoLockClosedOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";

type Item = {
    name: string;
    link: string;
    icon: IconType;
    isActive: (pathname: string) => boolean;
}
const items: Item[] = [{
    name: 'Profile',
    link: LOCATION_PATH.ACCOUNT.PAGE,
    icon: IoPersonOutline,
    isActive: (pathname: string) => pathname.endsWith(LOCATION_PATH.ACCOUNT.PAGE)
}, {
    name: 'Settings',
    link: LOCATION_PATH.ACCOUNT.SETTINGS,
    icon: IoSettingsOutline,
    isActive: (pathname: string) => pathname.startsWith(LOCATION_PATH.ACCOUNT.SETTINGS)

}, {
    name: 'Security',
    link: LOCATION_PATH.ACCOUNT.SECURITY.PAGE,
    icon: IoLockClosedOutline,
    isActive: (pathname: string) => pathname.startsWith(LOCATION_PATH.ACCOUNT.SECURITY.PAGE)

}]

export default function AccountNav({ className, ...props }: PropsWithChildren<JSX.IntrinsicElements['div']>){
    return <div className={`fixed ${className}`} {...props}>
        <div className="py-6">
            { items.map((item, ind) => <NavItem key={ind} item={item} />)}
        </div>
    </div>
}

function NavItem({ item }: {
    item: Item,
}){
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = item.isActive(location.pathname);

    const Icon = item.icon;
    const onClick = useCallback(() => navigate(item.link), [item.link, navigate])
    return <div onClick={onClick} className={`my-0.5 px-4 py-2.25 rounded-r-2xl hover:bg-primary-bg active:bg-primary/20 group transition-all cursor-pointer ${isActive && '!bg-primary' }`}>
        <div className={`flex items-center gap-2 text-text-base group-active:text-primary transition-all ${ isActive && '!text-text-alt' }`}>
            <Icon size={17} />
            <p className="text-sm">{ item.name }</p>
        </div>
    </div>
}
