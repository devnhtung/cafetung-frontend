import { useState } from "react";
import MenuItem from "../components/MenuItem";

interface Category {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  image_url: string;
  price: string;
}
interface MenuSidebarProps {
  isOpen: boolean;
  categories: Category[];
  products: Category[];
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({
  isOpen,
  categories,
  products,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p: any) => p.category_id === parseInt(selectedCategory)
        );
  console.log(products);
  return (
    <div
      id="menu"
      className={`fixed top-0 right-0 h-full w-[90%] bg-primary-opaque p-6 z-100 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } scrollbar-hidden`}
    >
      <h2 className="text-xl uppercase font-bold mb-6 border-b border-secondary pb-2 text-white">
        Thực Đơn
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`filter-btn px-3 py-1 rounded-full text-sm transition ${
            selectedCategory === "all"
              ? "bg-secondary text-white"
              : "bg-gray-700 text-white hover:bg-secondary"
          }`}
        >
          Tất cả
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`filter-btn px-3 py-1 rounded-full text-sm transition ${
              selectedCategory === cat.id
                ? "bg-secondary text-white"
                : "bg-gray-700 text-white hover:bg-secondary"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div id="menu-items" className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product: any) => (
            <MenuItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
