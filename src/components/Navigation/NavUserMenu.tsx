import { LuUser } from "react-icons/lu";
import NavButton from "./NavButton";
import { useNavigate } from "react-router";
import { JSX, PropsWithChildren, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/user";
import { MdSettings } from "react-icons/md";
import { LOCATION_PATH } from "../../constants/locations";
import { IoChevronForward, IoLogOut } from "react-icons/io5";

export default function NavUserMenu(){
    const [active, setActive] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement|null>(null);
    const menuRef = useRef<HTMLDivElement|null>(null);
    const navigate = useNavigate();
    const { isLoading, isLoggedIn, user, logout } = useAuth();

    const buttonClick = useCallback(() => {
        if(isLoading) return;
        if(!isLoggedIn) {
            navigate(LOCATION_PATH.AUTH.LOGIN)
            return;
        }
        setActive(prev => !prev)
    }, [isLoading, isLoggedIn, navigate]);

    const close = useCallback((e: MouseEvent) => {
        const target = e.target as Node;
        if (buttonRef.current && !buttonRef.current.contains(target) && menuRef.current && !menuRef.current.contains(target) && active)
            setActive(false);
    }, [active]);

    useEffect(() => {
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [close])

    return <>
        <NavButton ref={buttonRef} active={active} className={`text-text-base active:text-primary transition-all ${active && '!text-primary'}`} onClick={buttonClick}>
            <LuUser size={20} className="transition-all"/>
        </NavButton>
        { active && user && <Menu ref={menuRef} close={() => setActive(false)} user={user} logout={logout} /> }
    </>
}

function Menu({ close, user, logout, ...props }: {
    close: () => void;
    user: User;
    logout: () => void;
} & PropsWithChildren<JSX.IntrinsicElements["div"]>){
    const navigate = useNavigate();

    const goProfile = useCallback(() => {
        navigate(LOCATION_PATH.ACCOUNT.PAGE)
        close();
    }, [close, navigate]);
    const goSettings = useCallback(() => {
        navigate(LOCATION_PATH.ACCOUNT.SETTINGS)
        close();
    }, [close, navigate]);
    const goLogout = useCallback(() => {
        logout();
        close();
    }, [close, logout]);
    return <div className="absolute flex flex-col top-full right-0 mt-1 bg-background-alt shadow-menu rounded-lg overflow-hidden" {...props}>
        <UserProfile user={user} goProfile={goProfile} />
        <MenuItem name="Settings" icon={<MdSettings size={17}/>} onClick={goSettings} />
        <MenuItem name="Logout" icon={<IoLogOut size={15}/>} onClick={goLogout} />
    </div>
}

function UserProfile({ user, goProfile }: {
    user: User;
    goProfile: () => void;
}){
    return <div className="flex flex-col">
        <div className="px-1 py-1.75">
            <div onClick={goProfile} className="flex px-1.5 py-2 gap-2 rounded-md hover:bg-primary-bg-light cursor-pointer transition-all">
                <div className="flex rounded-full w-10 h-10 bg-accent">
                </div>
                <div className="flex flex-col justify-center text-text-base">
                    <p className="text-ellipsis text-nowrap text-[15px]/4 font-black">{user?.name}</p>
                    <p className="text-xs text-primary">See your account</p>
                </div>
            </div>
        </div>
        <div className="relative w-full px-3">
            <div className=" h-0.25 w-full bg-accent/15"></div>
        </div>
    </div>
}

function MenuItem({ name, icon, group = false, onClick }: {
    name: string;
    icon?: ReactNode;
    group?: boolean;
    onClick?: () => void;
}){
    return <div className="text-text-base px-1 py-0.75">
        <div onClick={onClick} className="flex items-center gap-3 w-64 px-1.5 py-1.25 rounded-md hover:bg-primary-bg-light cursor-pointer transition-all">
            { icon && <div className="p-2 rounded-full bg-primary-bg/65 text-primary">{ icon }</div> }
            <p className="text-ellipsis text-nowrap text-[15px]">{ name }</p>
            { group && <div className="ml-auto mr-1">
                <IoChevronForward/>
            </div> }
        </div>
    </div>
}
