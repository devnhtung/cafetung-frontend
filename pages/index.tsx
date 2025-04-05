// pages/index.tsx
import { useState, useEffect } from "react";
import Slider from "@/components/Slider";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import { getProducts, getCategories } from "@/lib/api";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
// import { FaCartShopping } from "react-icons/fa6";
import Header from "@/components/Header";
import MenuSidebar from "@/components/MenuSidebar";
import ModalContact from "@/components/ModalContact";
import { CgClose } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

export default function Home() {
  const { isLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="font-sans text-white bg-primary relative h-screen overflow-hidden">
      {/* Slider */}
      <Slider />

      {/* Container chính */}
      <div className="main-content z-[-1] w-full h-full flex flex-col">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "absolute p-1 right-4 top-1   z-[1000] focus:outline-none md:w-12 md:h-12 w-10 h-10 flex items-center justify-center cursor-pointer hover:text-secondary transform transition-all duration-300 ease-in-out",
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
          {/* <div className="tooltip">
            <button className="w-12 h-12 cursor-pointer bg-white/20 rounded-full flex items-center justify-center hover:bg-white/70 hover:text-white transition duration-300">
              <FaCartShopping className="w-6 h-6 text-white" />
            </button>
            <span className="tooltip-text">Đặt hàng</span>
          </div> */}
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
        <ModalContact
          closeModal={() => setIsContactModalOpen(false)}
          isOpen={isContactModalOpen}
        />
      </div>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const userCookie = await getCookie("user", { req, res });
  const user = userCookie ? JSON.parse(userCookie) : null;
  const tokenCookie = await getCookie("auth_token", { req, res });
  const token = userCookie ? tokenCookie : null;

  return {
    props: {
      initialUser: user,
      initialToken: token,
    },
  };
}
