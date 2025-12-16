"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const images = ["/images/hero.png", "/images/hero2.png", "/images/hero3.png"];

const Hero: React.FC = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto pt-3 mb-4">
      <section className="relative rounded-2xl overflow-hidden h-[420px]">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">
                Beautiful Pots for Your Home
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                Discover beautifully designed pots perfect for home decor and
                indoor plants. Transform your space with our elegant collection.
              </p>
              <button
                onClick={() => router.push("/about")}
                className="bg-primary text-white px-8 py-3 rounded-xl font-medium cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
