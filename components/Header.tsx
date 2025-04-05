import AppLogo from "@/components/AppLogo";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { CgMenuRight, CgClose } from "react-icons/cg";
import Login from "@/components/Login";

interface HeaderProps {
  clickMenu: () => void;
  menuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ clickMenu, menuOpen }) => {
  return (
    <div className="header bg-primary z-100 relative top-0 left-0 px-5 py-2.5 flex justify-between items-center">
      {/* Navbar */}
      <Navbar />
      <div className="nav-actions flex items-center gap-2.5">
        <Login />
        <button
          onClick={clickMenu}
          className={cn(
            "focus:outline-none bg-white/70 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-secondary cursor-pointer hover:text-white transition",
            menuOpen ? "z-1000" : ""
          )}
        >
          {menuOpen && (
            <CgClose className="md:w-7 md:h-7  w-5 h-5 text-white hover:text-white" />
          )}
          {!menuOpen && (
            <CgMenuRight className="md:w-7 md:h-7 w-5 h-5 text-gray-700 hover:text-white" />
          )}
        </button>
      </div>
      {/* Logo bo tròn chèn xuống dưới */}
      <AppLogo />
    </div>
  );
};

export default Header;
