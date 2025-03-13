import { useCallback, FormEvent, useState } from "react";
import { useLocation, useNavigate } from 'react-router';
import { IoCartOutline, IoMoonOutline, IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import NavButton from "./NavButton";
import { platformButtons } from "../../constants/NavigationCategories";
import { MdGames } from "react-icons/md";

function Nav(){
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState<string>("");

    const searchParams = new URLSearchParams(location.search);
    const currentPlatform = searchParams.get('platform');
    const isActivePlatform = useCallback((platform: string) => location.pathname.includes('/category/games') && platform.toLowerCase() === currentPlatform, [currentPlatform, location.pathname]);

    const onSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/category/games?query=${search}`);
    }, [navigate, search])

    return <div className="flex flex-col justify-center items-center w-full h-auto bg-background-alt text-white z-10">
        <div className="max-w-7xl w-full px-4">
            <div className="w-full h-16 flex justify-between items-center gap-2">
                <div className="w-full h-full flex items-center gap-8">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <MdGames className="text-accent" size={30}/>
                        <p className="text-accent text-xl font-extrabold">RGames</p>
                    </div>
                    <div className="w-full">
                        <form onSubmit={onSearch} className="w-full">
                            <div className="relative px-4 bg-background rounded-2xl w-full max-w-sm flex items-center group focus-within:ring-2 focus-within:ring-primary-alt transition-all">
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-none bg-transparent py-2 text-text-base text-sm outline-0 border-0 pr-5"/>
                                <button className="absolute right-3 text-primary cursor-pointer active:text-primary/80 transition-all" type="submit">
                                    <IoSearch size={20}/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <NavButton className="text-text-base hover:text-primary flex">
                            <IoMoonOutline size={22} className="transition-all"/>
                        </NavButton>
                    </div>
                    <div>
                        <NavButton className="text-text-base hover:text-primary flex" onClick={() => navigate("/cart")}>
                            <IoCartOutline size={22} className="transition-all"/>
                        </NavButton>
                    </div>
                    <div>
                        <NavButton className="text-text-base hover:text-primary flex" onClick={() => navigate("/account")}>
                            <LuUser size={22} className="transition-all"/>
                        </NavButton>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full bg-primary-alt flex justify-center items-center">
            <div className="max-w-7xl w-full flex flex-wrap items-center px-2 py-1 gap-1">
                { platformButtons.map((category, index) => <div key={index} className="py-1">
                    <button onClick={() => navigate(`/category/games?platform=${category.name.toLowerCase()}`)} className={`flex items-center gap-2 px-3 py-1 rounded-xl transition-all border-0 ${ isActivePlatform(category.name) ? "bg-accent" : "hover:bg-white/23 active:bg-white/33 cursor-pointer text-accent"}`}>
                        { category.logo }
                        <p className="text-sm">{category.name}</p>
                    </button>
                </div>) }
            </div>
        </div>
    </div>
}

export default Nav;