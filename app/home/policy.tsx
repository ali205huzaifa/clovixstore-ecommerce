"use client";

import { Truck, ShieldCheck, RefreshCw } from "lucide-react";

const Policy: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto pt-3 mb-4">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Free Shipping
              </h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Quality Guarantee
              </h3>
              <p className="text-gray-600">Premium handcrafted products</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Easy Returns
              </h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policy;
