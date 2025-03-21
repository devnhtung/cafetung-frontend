// components/Login.tsx
import { FaFacebookF, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { User } from "@/types";

interface LoginProps {
  user: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
}

export default function Login({ user, onLoginSuccess, onLogout }: LoginProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hàm đăng nhập bằng Facebook
  const handleFacebookLogin = async () => {
    try {
      // Gọi API backend để khởi tạo đăng nhập bằng Facebook
      const response = await axios.get("/api/auth/facebook");
      if (response.data.redirectUrl) {
        // Chuyển hướng đến URL OAuth do backend cung cấp
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error("Facebook login error:", error);
      alert("Đăng nhập bằng Facebook thất bại!");
    }
  };

  // Hàm đăng nhập bằng Email/Mật khẩu
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/email", {
        email,
        password,
      });

      const userData = response.data.user;
      onLoginSuccess(userData);
      setIsModalOpen(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Email login error:", error);
      // setError(
      //   error.response?.data?.message ||
      //     "Đăng nhập thất bại! Vui lòng kiểm tra email và mật khẩu."
      // );
    }
  };
  return (
    <div className="flex items-center gap-2.5">
      {user ? (
        <>
          <span className="text-white">Xin chào, {user.name}</span>
          <button
            onClick={onLogout}
            className="bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-secondary transition"
          >
            Đăng xuất
          </button>
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
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 transition-opacity duration-300 ease-in-out ${
          isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-primary-opaque p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Đăng Nhập</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="focus:outline-none text-white hover:text-secondary transition"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-500 bg-opacity-20 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}

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
                className="w-full p-2 rounded-lg bg-white text-primary focus:outline-none"
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
                className="w-full p-2 rounded-lg bg-white text-primary focus:outline-none"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition w-full"
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
            className="w-full bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-secondary hover:text-white transition flex items-center justify-center gap-2"
          >
            <FaFacebookF className="w-5 h-5" />
            Đăng nhập bằng Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
