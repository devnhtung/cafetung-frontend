// components/Header.tsx
import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
interface HeaderProps {
  toggleSidebar: () => void;
  title: string | null;
}

const Header = ({ toggleSidebar, title }: HeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, handleLogout } = useAuth();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow p-3 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-gray-100 rounded cursor-pointer"
        >
          <FaBars className="w-5 h-5 text-primary" />
        </button>
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search..."
          className="border hidden md:block rounded-lg px-2 py-1 text-sm focus:outline-none"
        />
        <div className="block px-1 py-2 text-sm">{user?.role}</div>
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <Image
              width={8}
              height={8}
              src={user?.avatar ? user?.avatar : ""}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
              <Link
                href="/"
                className="block py-2 px-4 hover:bg-gray-100 text-sm"
              >
                Trang chủ
              </Link>
              <Link
                href="/dashboard/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Tài khoản
              </Link>
              <div
                onClick={() => {
                  handleLogout();
                }}
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
