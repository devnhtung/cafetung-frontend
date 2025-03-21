import AppLogo from "@/components/AppLogo";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { CgMenuRight, CgClose } from "react-icons/cg";
import Login from "@/components/Login";
import { parseCookies, destroyCookie } from "nookies";
import { User } from "@/types";

interface HeaderProps {
  clickMenu: () => void;
  user: User | null;
  handleUser: (user: User | null) => void;
  menuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  clickMenu,
  menuOpen,
  user,
  handleUser,
}) => {
  const handleLogout = () => {
    destroyCookie(null, "facebook_user");
    destroyCookie(null, "zalo_user");
    handleUser(null);
  };
  const handleLoginSuccess = (userData: User) => {
    handleUser(userData);
  };
  return (
    <div className="header bg-primary z-100 relative top-0 left-0 px-5 py-2.5 flex justify-between items-center">
      {/* Navbar */}
      <Navbar />
      <div className="nav-actions flex items-center gap-2.5">
        {/* <button className="bg-white text-gray-800 px-3 py-1 rounded-full hover:bg-secondary hover:text-white transition">
          Đăng nhập
        </button>
        <button
          className="bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-secondary transition opacity-50 cursor-not-allowed"
          disabled
        >
          Đăng xuất
        </button> */}
        <Login
          user={user}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />
        <button
          onClick={clickMenu}
          className={cn(
            "focus:outline-none bg-white/70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary cursor-pointer hover:text-white transition",
            menuOpen ? "z-1000" : ""
          )}
        >
          {menuOpen && (
            <CgClose className="w-6 h-6 text-white hover:text-white" />
          )}
          {!menuOpen && (
            <CgMenuRight className="w-6 h-6 text-gray-700 hover:text-white" />
          )}
        </button>
      </div>
      {/* Logo bo tròn chèn xuống dưới */}
      <AppLogo />
    </div>
  );
};

export default Header;
