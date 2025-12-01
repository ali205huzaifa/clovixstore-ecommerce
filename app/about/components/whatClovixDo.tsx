"use client";

import Image from "next/image";

export default function WhatWeDo() {
  return (
    <section className="w-full bg-white py-10 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        <div className="space-y-3 lg:col-span-2 max-w-[740px]">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary font-medium">
            What We Do
          </h2>

          <p className="text-black text-base font-normal mb-10">
            We offer a curated collection of showpieces and decorative products
            to enhance the beauty of your home or office. From elegant
            sculptures and artistic figurines to unique wall decor, our products
            are designed to add charm and personality to any space. We focus on
            quality, aesthetics, and attention to detail to make your decor
            shopping experience seamless and enjoyable.
          </p>

          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary font-medium mb-2">
            Our Mission
          </h2>

          <p className="text-black text-base font-normal mb-10">
            To provide customers with unique, high-quality decorative products
            that inspire creativity and transform spaces into beautiful,
            inviting environments.
          </p>

          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary font-medium mb-2">
            Our Vision
          </h2>

          <p className="text-black text-base font-normal">
            To be the go-to destination for stylish, artistic, and distinctive
            home decor products that bring elegance and joy to every space.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end lg:col-span-1 ml-8">
          <Image
            src="/images/img7.jpg"
            alt="Decorative products"
            width={400}
            height={260}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
