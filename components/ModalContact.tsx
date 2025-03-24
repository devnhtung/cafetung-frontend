import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalContactProps {
  isOpen: boolean;
  closeModal: () => void;
}
const ModalContact: React.FC<ModalContactProps> = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-30 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-primary-opaque p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Liên Hệ Với Chúng Tôi</h2>
          <button
            onClick={closeModal}
            className="focus:outline-none text-white hover:text-secondary transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
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
            <label htmlFor="email" className="block text-sm font-medium mb-1">
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
            <label htmlFor="message" className="block text-sm font-medium mb-1">
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
  );
};

export default ModalContact;
