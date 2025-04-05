"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AppLogo = () => {
  const base_storage_url = process.env.NEXT_PUBLIC_STORAGE_URL;
  const router = useRouter();
  return (
    <div className="bg-primary rounded-full logo-container absolute p-1 left-1/2 top-full -translate-x-1/2 -translate-y-5/8 z-30">
      <Image
        onClick={() => router.push("/")}
        width={20}
        height={20}
        src={`${base_storage_url}/logo.svg`}
        alt="Logo Café Tùng"
        className="w-15 h-15 md:w-20 md:h-20 -ml-0.5 rounded-full border-primary  object-contain"
      />
    </div>
  );
};

export default AppLogo;
