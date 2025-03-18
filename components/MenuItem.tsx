// components/MenuItem.tsx
"use client";
import Image from "next/image";

export default function MenuItem({ product }: { product: any }) {
  const backendBaseUrl = "http://localhost:8000/storage/"; // Thay bằng URL backend thực tế
  const imageUrl = product.image_url
    ? `${backendBaseUrl}${product.image_url}`
    : "/default-image.jpg";

  return (
    <div className="menu-item flex items-center p-[6px] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition duration-300">
      <Image
        src={imageUrl}
        alt={product.name}
        width={64}
        height={64}
        className="w-16 h-16 mr-4 rounded object-cover"
      />
      <div className="flex-1">
        <p className="item-name font-bold text-lg text-white">{product.name}</p>
        <p className="item-price font-semibold text-base text-white bg-[rgba(244,162,97,0.2)] px-2 py-[2px] rounded inline-block">
          {product.price} VNĐ
        </p>
      </div>
    </div>
  );
}
