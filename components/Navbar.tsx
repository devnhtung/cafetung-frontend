// components/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import Navlink from "./Navlink";
import { TfiClose } from "react-icons/tfi";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Nút hamburger cho mobile */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <TfiClose className="w-6 h-6 text-secondary" />
        ) : (
          <RxHamburgerMenu className="w-6 h-6" />
        )}
      </button>

      {/* Menu trên desktop */}
      <div className="hidden md:flex items-center gap-5 nav-links">
        <Navlink className="nav-link" href="#" title="Về Tùng" />
        <Navlink className="nav-link" href="#" title="Location" />
        <Navlink className="nav-link" href="#" title="Chia sẻ" />
      </div>

      {/* Menu trên mobile với hiệu ứng */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-12 left-0 w-full min-w-[200px] bg-primary-opaque shadow-lg z-[150]"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              <Navlink
                className="nav-link text-white text-lg"
                href="#"
                title="Về Tùng"
                onClick={handleLinkClick}
              />
              <Navlink
                className="nav-link text-white text-lg"
                href="#"
                title="Location"
                onClick={handleLinkClick}
              />
              <Navlink
                className="nav-link text-white text-lg"
                href="#"
                title="Chia sẻ"
                onClick={handleLinkClick}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
