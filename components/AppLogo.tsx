"use client";
import Image from "next/image";

const AppLogo = () => {
  const base_storage_url = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="bg-primary rounded-full logo-container absolute p-1 left-1/2 top-full -translate-x-1/2 -translate-y-1/2 z-30">
      <Image
        src={`${base_storage_url}/logo.svg`}
        alt="Logo Café Tùng"
        className="w-20 h-20 -ml-0.5 rounded-full border-primary  object-contain"
      />
    </div>
  );
};

export default AppLogo;
