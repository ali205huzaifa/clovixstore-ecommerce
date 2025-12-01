import Link from "next/link";
import ProductCard from "../components/common/ProductCard";
import { products } from "../types/product";

export default function ProductList() {
  return (
    <section className="w-full bg-white py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}{" "}
        </div>
      </div>
    </section>
  );
}
