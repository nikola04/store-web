import { Outlet } from "react-router";
import Nav from "../navigation/Nav";

const NavLayout = () => {
  return (
    <div className="relative bg-background w-screen max-w-full h-auto flex flex-col justify-center items-center">
        <Nav />
        <Outlet />
    </div>
  );
};

export default NavLayout;
