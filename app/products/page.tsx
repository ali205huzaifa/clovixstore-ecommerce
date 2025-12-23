"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "../components/common/ProductCard";
import { Product } from "../types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/proxy/product`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const json = await res.json();

        const mappedProducts = json.data.data.map((item: any) => ({
          id: item._id,
          name: item.title,
          slug: item.slug,
          price: item.price,
          description: item.description,
          img: item.images?.[0] || "/images/placeholder.png",
          category: item.category,
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
