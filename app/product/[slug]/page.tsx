"use client";

import { useParams } from "next/navigation";
import ProductDetailsServer from "./ProductDetailsServer";

export default function moreProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <ProductDetailsServer slug={slug} />;
}
