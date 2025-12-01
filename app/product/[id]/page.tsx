"use client";

import { useState } from "react";
import AddToCartButton from "@/app/home/AddtoCart";
import { products } from "@/app/types/product";
import ProductList from "@/app/products/page";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="p-10 text-xl">Product not found</p>;

  return <ProductDetails product={product} />;
}

function ProductDetails({ product }: any) {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 py-6 gap-10">
        <div className="flex justify-center items-start">
          <img
            src={product.img}
            className="w-full max-w-xl h-[400px] object-cover rounded-2xl"
          />
        </div>

        <div className="flex flex-col border-l border-primary pl-10">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-600 mt-3">
            Base Price: <span className="font-semibold">${product.price}</span>
          </p>

          <p className="text-lg text-gray-700 mt-5 leading-relaxed">
            {product.description ||
              "This is a premium quality product crafted with great attention to detail."}
          </p>

          <div className="mt-8">
            <label className="block text-lg font-medium mb-2">Quantity</label>
            <select
              className="border rounded-lg px-4 py-2 text-lg"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <p className="text-2xl font-semibold mt-5">
            Total Price: <span className="text-secondary">${totalPrice}</span>
          </p>

          <div className="mt-4">
            <AddToCartButton product={{ ...product, quantity }} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-primary text-2xl font-medium">More Products</p>
      </div>
      <div className="my-8">
        <ProductList />
      </div>
    </div>
  );
}
