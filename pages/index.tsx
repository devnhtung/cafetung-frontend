// pages/index.tsx
import { useState, useEffect } from "react";
import Slider from "@/components/Slider";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import { getProducts, getCategories } from "@/lib/api";
import { XMarkIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaCartShopping } from "react-icons/fa6";
import Header from "@/components/Header";
import MenuSidebar from "@/components/MenuSidebar";
import { CgClose } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";
import { User, HomeProps } from "@/types";

export default function Home({ initialUser, initialToken }: HomeProps) {
  const [products, setProducts] = useState([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState<User | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
  //   !!initialUser && !!initialToken
  // );
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
    const checkToken = async () => {
      if (token) {
        console.log(token);
        setToken(token);
        // try {
        //   const response = await axios.get(`/api/auth/check?token=${token}`);
        //   setUser(response ? response.data.user : null);
        //   // setIsAuthenticated(true);
        // } catch (error) {
        //   console.error("Token validation failed:", error);
        //   setUser(null);
        //   setToken(null);
        //   // setIsAuthenticated(false);
        //   destroyCookie(null, "user");
        //   destroyCookie(null, "auth_token");
        // }
      }
    };
    checkToken();
  }, [token]);

  // const handleLoginSuccess = (userData: User) => {
  //   setUser(userData);
  //   const cookies = parseCookies();
  //   setToken(cookies.auth_token || null);
  //   setIsAuthenticated(true);
  // };

  // const handleLogout = () => {
  //   destroyCookie(null, "user");
  //   destroyCookie(null, "auth_token");
  //   setUser(null);
  //   setToken(null);
  //   setIsAuthenticated(false);
  // };
  return (
    <div className="font-sans text-white bg-primary relative h-screen overflow-hidden">
      {/* Slider */}
      <Slider />

      {/* Container chính */}
      <div className="main-content z-[-1] w-full h-full flex flex-col">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "fixed p-1 left-1/2 z-[1000] focus:outline-none  w-12 h-12 flex items-center justify-center cursor-pointer hover:text-secondary transform transition-all duration-300 ease-in-out",
            isMenuOpen
              ? "translate-y-1 opacity-100"
              : "-translate-y-full opacity-0"
          )}
        >
          <CgClose className="w-12 h-12 cursor-pointer text-secondary hover:text-secondary" />
        </button>
        {/* Header */}
        <Header
          clickMenu={() => setIsMenuOpen(!isMenuOpen)}
          menuOpen={isMenuOpen}
          user={user}
          handleUser={setUser}
        />
        {/* Menu Sidebar */}
        <MenuSidebar
          isOpen={isMenuOpen}
          categories={categories}
          products={products}
        />

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
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context);
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  const token = cookies.auth_token || null;

  return {
    props: {
      initialUser: user,
      initialToken: token,
    },
  };
}
