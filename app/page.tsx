"use client";

import ClovixContact from "./about/components/ClovixContact";
import AboutCustomers from "./about/components/ClovixCustomers";
import ClovixFaqs from "./about/components/ClovixFaqs";
import ProductFilters from "./home/filters";
import Hero from "./home/hero";
import Policy from "./home/policy";
import ProductsPage from "./products/page";

export default function Home() {
  return (
    <div>
      <div className="px-4">
        <Hero />
        <ProductFilters />
      </div>
      <ProductsPage />
      <Policy />
      <AboutCustomers />
      <ClovixFaqs />
      <ClovixContact />
    </div>
  );
}
