import { useLocation, useNavigate } from "react-router";
import { platformButtons } from "../../constants/platforms";
import { useCallback } from "react";

export default function NavSubMenu(){
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const currentPlatform = searchParams.get('platform');
    const isActivePlatform = useCallback((platform: string) => location.pathname.includes('/category/games') && platform.toLowerCase() === currentPlatform, [currentPlatform, location.pathname]);

    return <div className="w-full bg-primary-alt flex justify-center items-center">
        <div className="max-w-7xl w-full flex flex-wrap items-center px-2 py-1 gap-1">
            { platformButtons.map((category, index) => <div key={index} className="py-1">
                <button onClick={() => navigate(`/category/games?platform=${category.name.toLowerCase()}`)} className={`flex items-center gap-2 px-3 py-1 rounded-xl transition-all border-0 ${ isActivePlatform(category.name) ? "bg-accent" : "hover:bg-white/23 active:bg-white/33 cursor-pointer text-accent"}`}>
                    { category.logo }
                    <p className="text-sm">{category.name}</p>
                </button>
            </div>) }
        </div>
    </div>
}
