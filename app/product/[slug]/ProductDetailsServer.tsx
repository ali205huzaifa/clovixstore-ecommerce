"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import ProductDetailsClient from "./ProductDetailsClient";
import MoreProducts from "./MoreProducts";

interface ProductDetailsServerProps {
  slug: string;
}

export default function ProductDetailsServer({
  slug,
}: ProductDetailsServerProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/proxy/product/slug/${slug}`);

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const json = await res.json();
        const p = json.data;

        const mappedProduct: Product = {
          id: p._id,
          name: p.title,
          price: p.price,
          description: p.description,
          img: p.images?.[0] || "/images/placeholder.png",
          category: p.category,
          slug: p.slug,
        };

        setProduct(mappedProduct);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-10">
        <p className="text-center text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto p-10">
        <p className="text-center text-red-500 text-xl">
          {error || "Product not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ProductDetailsClient product={product} />
      <MoreProducts />
    </div>
  );
}
