"use client";

import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const total = cart.reduce((a: number, c: any) => a + c.price * c.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Information</h2>

          <form className="space-y-4">
            <input
              className="w-full border p-3 rounded"
              placeholder="Full Name"
            />
            <input className="w-full border p-3 rounded" placeholder="Email" />
            <input className="w-full border p-3 rounded" placeholder="Phone" />
            <input
              className="w-full border p-3 rounded"
              placeholder="Address"
            />
          </form>

          {/* <h2 className="text-2xl font-semibold mt-8 mb-4">Payment Details</h2>
          <div className="border p-4 rounded bg-gray-100">
            <p className="text-gray-600">Stripe card element goes here</p>
          </div> */}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 border p-4 rounded">
            {cart.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="text-xl font-bold flex justify-between border-t pt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 text-lg rounded mt-6">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
