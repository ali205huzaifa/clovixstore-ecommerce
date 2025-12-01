"use client";

import { message } from "antd";
import { useCart } from "@/app/context/CartContext";

export default function AddToCartButton({ product }: any) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    message.success("Product added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full h-12 mt-4 bg-primary text-white px-6 py-2 rounded-xl cursor-pointer"
    >
      Add to Cart
    </button>
  );
}
