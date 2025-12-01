"use client";

import { useCart } from "@/app/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function CartIcon() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const totalQty = cart.reduce((a: any, c: any) => a + c.quantity, 0);

  return (
    <>
      <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
        <ShoppingCart size={20} />
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
            {totalQty}
          </span>
        )}
      </div>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
