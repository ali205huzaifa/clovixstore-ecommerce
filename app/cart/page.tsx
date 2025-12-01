"use client";

import Link from "next/link";
import { useCart, CartItem } from "../components/CartContext";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item: CartItem, i: number) => (
              <li key={i} className="border p-4 rounded flex justify-between">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>

          <Link href="/checkout">
            <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
