// components/MenuItem.tsx
"use client";
import Image from "next/image";
import { formatter } from "@/lib/utils";
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface MenuItemProps {
  product: Product;
}
const MenuItem: React.FC<MenuItemProps> = ({ product }) => {
  const backendBaseUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  const imageUrl = product.image
    ? `${backendBaseUrl}/${product.image}`
    : "/default-image.jpg";

  return (
    <div className="menu-item cursor-pointer flex items-start p-[6px] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition duration-300">
      <Image
        src={imageUrl}
        alt={product.name}
        width={64}
        height={64}
        className="w-[30%] aspect-square mr-5  rounded object-cover"
      />
      <div className="flex-1">
        <p className="item-name mb-2 font-bold text-lg text-white">
          {product.name}
        </p>
        <p className="item-price font-semibold text-base text-white bg-[rgba(244,162,97,0.2)] px-2 py-[2px] rounded inline-block">
          {formatter.format(product.price)}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
