import { Outlet } from "react-router";
import Nav from "../navigation/Nav";

const NavLayout = ({ fullWidth = false }: {
    fullWidth?: boolean
}) => {
  return (
    <div className="relative bg-background w-full max-w-full h-auto flex flex-col justify-center items-center">
        <Nav fullWidth={fullWidth} />
        <Outlet />
    </div>
  );
};

export default NavLayout;
