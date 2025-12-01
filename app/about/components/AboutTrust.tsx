import Image from "next/image";
import React from "react";

const AboutTrust = () => {
  return (
    <section className="w-full bg-[#1E1E1E] text-white py-10 sm:py-14 px-6 sm:px-10 lg:px-20 xl:px-30">
      <div className="max-w-5xl container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white font-medium">
              Why Customers Trust ClovixStore
            </h2>
            <p className="mt-6 text-white text-base font-normal max-w-[900px]">
              Customers choose ClovixStore because we offer high-quality,
              unique, and beautifully crafted decorative products. We are
              reliable, transparent, and committed to excellent service. From
              careful packaging to timely delivery, we handle every detail so
              you can enjoy decorating your space with confidence and joy.
            </p>
          </div>
        </div>

        <div className="text-4xl sm:text-5xl text-white">
          <Image
            src="/icons/abouttick-icon.svg"
            alt="Trusted Store Icon"
            width={100}
            height={100}
            className="ml-2"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutTrust;
