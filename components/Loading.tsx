// components/Loading.tsx
import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  const base_storage_url = process.env.NEXT_PUBLIC_STORAGE_URL;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
      {/* Logo giống như trong header, nhưng thêm hiệu ứng xoay */}
      <div className="logo-container">
        <Image
          width={30}
          height={30}
          src={`${base_storage_url}/logo.svg`}
          alt="Logo Café Tùng"
          className="w-30 h-30 rounded-full  border-primary bg-primary object-contain animate-bounce"
        />
      </div>

      {/* Nền mờ để làm nổi bật logo */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div> */}
    </div>
  );
};

export default Loading;
