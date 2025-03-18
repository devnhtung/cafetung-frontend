// pages/index.tsx
import { useState, useEffect } from "react";
import Slider from "../components/Slider";
import MenuItem from "../components/MenuItem";
import { getProducts, getCategories } from "../utils/api";
import { XMarkIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaCartShopping } from "react-icons/fa6";
import { CgMenuRight } from "react-icons/cg";
import SocialMediaLinks from "../components/SocialMediaLinks";
import AppLogo from "@/components/AppLogo";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [productsResponse, categoriesResponse] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
    };
    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p: any) => p.category_id === parseInt(selectedCategory)
        );
  return (
    <div className="font-sans text-white bg-primary relative h-screen overflow-hidden">
      {/* Slider */}
      <Slider />

      {/* Container chính */}
      <div className="main-content z-[-1] w-full h-full flex flex-col">
        {/* Header */}
        <div className="header bg-primary z-100 relative top-0 left-0 px-5 py-2.5 flex justify-between items-center">
          {/* Navbar */}
          <Navbar />
          <div className="nav-actions flex items-center gap-2.5">
            <button className="bg-white text-gray-800 px-3 py-1 rounded-full hover:bg-secondary hover:text-white transition">
              Đăng nhập
            </button>
            <button
              className="bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-secondary transition opacity-50 cursor-not-allowed"
              disabled
            >
              Đăng xuất
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="focus:outline-none bg-white/70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary cursor-pointer hover:text-white transition"
            >
              <CgMenuRight className="w-6 h-6 text-gray-700 hover:text-white" />
            </button>
          </div>
          {/* Logo bo tròn chèn xuống dưới */}
          <AppLogo />
        </div>

        {/* Menu Sidebar */}
        <div
          id="menu"
          className={`fixed top-0 right-0 h-full w-[90%] bg-primary-opaque p-6 z-20 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } scrollbar-hidden`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 focus:outline-none text-white hover:text-secondary transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold mb-6 border-b border-secondary pb-2 text-white">
            Thực Đơn
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`filter-btn px-3 py-1 rounded-full text-sm transition ${
                selectedCategory === "all"
                  ? "bg-secondary text-white"
                  : "bg-gray-700 text-white hover:bg-secondary"
              }`}
            >
              Tất cả
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`filter-btn px-3 py-1 rounded-full text-sm transition ${
                  selectedCategory === cat.id
                    ? "bg-secondary text-white"
                    : "bg-gray-700 text-white hover:bg-secondary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div id="menu-items" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product: any) => (
                <MenuItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Overlay khi menu mở */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* Liên kết mạng xã hội */}
        <SocialMediaLinks />

        {/* Nút Order và Liên hệ */}
        <div className="absolute bottom-8 right-6 flex flex-col space-y-6 z-10">
          <div className="tooltip">
            <button className="w-12 h-12 cursor-pointer bg-white/20 rounded-full flex items-center justify-center hover:bg-white/70 hover:text-white transition duration-300">
              <FaCartShopping className="w-6 h-6 text-white" />
            </button>
            <span className="tooltip-text">Đặt hàng</span>
          </div>
          <div className="tooltip">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-12 h-12 bg-white/20 cursor-pointer rounded-full flex items-center justify-center hover:bg-white/70 hover:text-white transition duration-300"
            >
              <EnvelopeIcon className="w-6 h-6 text-white" />
            </button>
            <span className="tooltip-text">Liên hệ</span>
          </div>
        </div>

        {/* Modal Liên hệ */}
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-30 transition-opacity duration-300 ease-in-out ${
            isContactModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-primary-opaque p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Liên Hệ Với Chúng Tôi</h2>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="focus:outline-none text-white hover:text-secondary transition"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Họ Tên
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 rounded-lg bg-white text-primary focus:outline-none"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-lg bg-white text-primary focus:outline-none"
                  placeholder="Nhập email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Tin Nhắn
                </label>
                <textarea
                  id="message"
                  className="w-full p-2 rounded-lg bg-white text-primary focus:outline-none"
                  rows={4}
                  placeholder="Nhập tin nhắn của bạn"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondary/80 transition w-full"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
