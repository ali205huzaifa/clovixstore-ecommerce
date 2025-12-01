"use client";

import { useCart } from "@/app/context/CartContext";
import { X } from "lucide-react";
import Link from "next/link";

export default function CartDrawer({ open, onClose }: any) {
  const { cart, updateCart } = useCart();

  const removeItem = (id: number) => {
    updateCart(cart.filter((item: any) => item.id !== id));
  };

  const total = cart.reduce((a: number, c: any) => a + c.price * c.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 z-50 
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-black text-xl font-semibold">Your Cart</h2>
        <X size={24} className="cursor-pointer" onClick={onClose} />
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[75vh]">
        {cart.length === 0 && (
          <p className="text-center text-primary font-bold pt-8">
            Cart is empty
          </p>
        )}

        {cart.map((item: any) => (
          <div
            key={item.id}
            className="flex gap-3 border-b border-primary pb-3"
          >
            <img src={item.img} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
              <p className="text-gray-800 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="cursor-pointer mr-6"
            >
              <img
                src="/icons/delete-icon.svg"
                alt="Icon"
                className="w-6 h-6"
              />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <p className="text-black text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </p>

        <Link
          href={cart.length === 0 ? "#" : "/checkout"}
          onClick={cart.length === 0 ? undefined : onClose}
        >
          <button
            disabled={cart.length === 0}
            className={`w-full block text-center bg-primary text-white py-3 mt-4 rounded-xl cursor-pointer
        ${cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
