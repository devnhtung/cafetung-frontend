// components/Login.tsx
import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import ModalLogin from "@/components/ModalLogin";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi nhấn ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative flex items-center gap-2.5" ref={dropdownRef}>
      {user ? (
        <>
          <div className="block px-4 py-2 hover:bg-gray-100 text-sm">
            {user?.name}
          </div>
          <div className="relative">
            {/* Nút hiển thị avatar */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer flex items-center gap-1 md:gap-2 bg-gray-500 text-white px-2 py-1 rounded-full hover:bg-secondary transition avatar-container"
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={3}
                  height={3}
                  className="w-5 h-5 md:w-7 md:h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {isDropdownOpen ? (
                <FaChevronUp className="w-3 h-3 md:w-4 md:h-4" />
              ) : (
                <FaChevronDown className="w-3 h-3 md:w-4 md:h-4" />
              )}
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-primary-opaque rounded-lg shadow-lg z-50"
                >
                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-white hover:bg-secondary hover:text-white transition"
                    >
                      Trang quản lý
                    </Link>
                    <Link
                      href="/dashboard/schedule"
                      className="block px-4 py-2 text-white hover:bg-secondary hover:text-white transition"
                    >
                      Lịch làm việc
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-white hover:bg-secondary hover:text-white transition"
                    >
                      Hồ sơ
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white hover:bg-secondary hover:text-white transition"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-gray-800 px-3 py-1 rounded-full hover:bg-secondary hover:text-white transition"
        >
          Đăng nhập
        </button>
      )}

      {/* Modal Đăng nhập */}
      <ModalLogin
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
}
