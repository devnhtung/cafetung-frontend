// pages/order.tsx
"use client";
import { useState, useEffect } from "react";
import { getProducts, createOrder } from "../utils/api";
import { useRouter } from "next/router";

export default function Order() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState<{ product_id: number; quantity: number }[]>(
    []
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const addToCart = (productId: number) => {
    const existingItem = cart.find((item) => item.product_id === productId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product_id: productId, quantity: 1 }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({
        delivery_address: deliveryAddress,
        phone,
        items: cart,
      });
      alert("Đặt hàng thành công!");
      router.push("/");
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Đặt hàng</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl mb-2">Chọn món</h2>
          {products.map((product: any) => (
            <div
              key={product.id}
              className="border p-4 rounded mb-2 flex justify-between"
            >
              <div>
                <h3>{product.name}</h3>
                <p>{product.price} VNĐ</p>
              </div>
              <button
                onClick={() => addToCart(product.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Thêm
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl mb-2">Giỏ hàng</h2>
          {cart.map((item, index) => {
            const product = products.find((p: any) => p.id === item.product_id);
            return (
              <div key={index} className="border p-2 rounded mb-2">
                <p>
                  {product?.name} - Số lượng: {item.quantity}
                </p>
              </div>
            );
          })}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Địa chỉ giao hàng
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-2 rounded-lg border"
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded-lg border"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Đặt hàng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
