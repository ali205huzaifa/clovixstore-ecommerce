"use client";

import ClovixContact from "./about/components/ClovixContact";
import AboutCustomers from "./about/components/ClovixCustomers";
import ClovixFaqs from "./about/components/ClovixFaqs";
import ImageSwiper from "./home/productSwipper";
import ProductsPage from "./products/page";

export default function Home() {
  return (
    <div>
      <ImageSwiper />
      <div className="my-8">
        <ProductsPage />
      </div>
      <AboutCustomers />
      <ClovixFaqs />
      <ClovixContact />
    </div>
  );
}
