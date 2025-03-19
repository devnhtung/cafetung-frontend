// pages/menu.tsx
import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../lib/api";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p: any) => p.category_id === parseInt(selectedCategory)
        );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Thực Đơn</h1>
      <div className="mb-4">
        <button
          onClick={() => setSelectedCategory("all")}
          className="mr-2 p-2 bg-gray-200 rounded"
        >
          Tất cả
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="mr-2 p-2 bg-gray-200 rounded"
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover"
            />
            <h2 className="text-xl">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">{product.price} VNĐ</p>
          </div>
        ))}
      </div>
    </div>
  );
}
