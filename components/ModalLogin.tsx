import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

interface ModalLoginProps {
  isOpen: boolean;
  closeModal: () => void;
}
const ModalLogin: React.FC<ModalLoginProps> = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { handleLogin } = useAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await handleLogin(email, password);
      setEmail("");
      setPassword("");
      closeModal();
    } catch (error) {
      console.error("Email login error:", error);
      setError("Đăng nhập thất bại! Vui lòng kiểm tra email và mật khẩu.");
    }
  };
  // Hàm đăng nhập bằng Facebook
  const handleFacebookLogin = async () => {
    try {
      // Gọi API backend để khởi tạo đăng nhập bằng Facebook
      const response = await axios.get("/api/auth/facebook");
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error("Facebook login error:", error);
      alert("Đăng nhập bằng Facebook thất bại!");
    }
  };
  return (
    <div
      className={`fixed pt-[65px] inset-0  bg-black/70 flex items-start justify-center z-100 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-primary-opaque p-6 pt-[40px] rounded-lg w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="flex-1 text-xl uppercase text-center font-bold">
            Đăng nhập
          </h2>
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 cursor-pointer focus:outline-none text-white hover:text-secondary transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {error && <div className="mb-4 p-2 text-red-500  text-sm">{error}</div>}

        {/* Form đăng nhập bằng Email/Mật khẩu */}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg bg-white text-gray-700 focus:outline-none"
              placeholder="Nhập email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-white"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-white text-gray-700 focus:outline-none"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-secondary text-white cursor-pointer px-4 py-2 rounded-full hover:bg-opacity-80 transition w-full"
          >
            Đăng nhập
          </button>
        </form>

        {/* Đường phân cách */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-primary-opaque text-white">Hoặc</span>
          </div>
        </div>

        {/* Nút đăng nhập bằng Facebook */}
        <button
          onClick={handleFacebookLogin}
          className="cursor-pointer w-full bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-secondary hover:text-white transition flex items-center justify-center gap-2"
        >
          <FaFacebookF className="w-5 h-5" />
          Đăng nhập bằng Facebook
        </button>
      </div>
    </div>
  );
};

export default ModalLogin;
