import { useCallback, FormEvent, useState } from "react";
import { useNavigate } from 'react-router';
import { IoCartOutline, IoSearch } from "react-icons/io5";
import NavButton from "./NavButton";
import { MdGames } from "react-icons/md";
import NavUserMenu from "./NavUserMenu";

function Nav({ fullWidth = false }: {
    fullWidth: boolean
}){
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");

    const onSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/category/games?query=${search}`);
    }, [navigate, search])

    return <>
        <div className="h-16"></div>
        <div className="fixed top-0 flex flex-col justify-center items-center w-full max-w-full h-auto bg-background-alt text-white shadow-xs z-30">
            <div className={`${ !fullWidth && 'max-w-7xl' } w-full px-4`}>
                <div className="relative w-full h-16 flex justify-between items-center gap-2">
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
                    <div className="flex items-center gap-3.5">
                        <div>
                            <NavButton className="text-text-base active:text-primary flex transition-all" onClick={() => navigate("/cart")}>
                                <IoCartOutline size={20} className="transition-all"/>
                            </NavButton>
                        </div>
                        <div>
                            <NavUserMenu />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Nav;
