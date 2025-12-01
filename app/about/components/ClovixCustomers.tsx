"use client";

import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const AboutCustomers = () => {
  const customers = [
    {
      name: "Ayesha",
      img: "/images/customer2.png",
      rating: 4.7,
      review:
        "I ordered a crystal showpiece from ClovixStore and it’s absolutely stunning! The detailing and shine look even better in real life.",
    },
    {
      name: "Ali",
      img: "/images/customer1.png",
      rating: 4.7,
      review:
        "I loved the quality of the decorative showpiece I received. It added a beautiful touch to my living room. Highly recommended!",
    },
    {
      name: "Zain",
      img: "/images/customer3.png",
      rating: 4.7,
      review:
        "The craftsmanship of the showpiece is amazing. It arrived perfectly packed and looks premium. Will definitely shop again!",
    },
    {
      name: "Sara",
      img: "/images/customer4.png",
      rating: 4.7,
      review:
        "ClovixStore never disappoints! The showpiece I bought is elegant, unique, and has become the highlight of my décor.",
    },
  ];

  const CustomerCard = ({
    customer,
    idx,
  }: {
    customer: (typeof customers)[0];
    idx: number;
  }) => (
    <div className="flex flex-col h-full overflow-hidden">
      {idx % 2 === 0 ? (
        <>
          <Image
            src={customer.img}
            alt={customer.name}
            width={300}
            height={300}
            className="object-cover w-full sm:h-72 lg:h-80 h-80 rounded-xl"
          />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-primary font-semibold">
                {customer.name}
              </h3>
              <span className="flex items-center text-sm font-medium ml-3">
                <span className="text-black">{customer.rating}</span>
                <img
                  src="/icons/star-icon.svg"
                  alt="star"
                  className="ml-1 w-3 h-4"
                />
              </span>
            </div>
            <p className="mt-2 text-neutral-600 text-sm font-medium leading-relaxed">
              {customer.review}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-primary font-semibold">
                {customer.name}
              </h3>
              <span className="flex items-center text-sm font-medium ml-3">
                <span className="text-black">{customer.rating}</span>
                <img
                  src="/icons/star-icon.svg"
                  alt="star"
                  className="ml-1 w-3 h-3"
                />
              </span>
            </div>
            <div className="h-20">
              <p className="mt-2 text-neutral-600 text-sm font-medium leading-relaxed">
                {customer.review}
              </p>
            </div>
          </div>
          <Image
            src={customer.img}
            alt={customer.name}
            width={300}
            height={300}
            className="object-cover w-full h-80 sm:h-72 lg:h-80 rounded-xl"
          />
        </>
      )}
    </div>
  );

  return (
    <section className="w-full bg-white py-8 px-4">
      <div className="container max-w-5xl mx-auto border border-[#EBEBEB] rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-2 p-4 gap-6">
          <div>
            <p className="uppercase text-primary text-sm font-semibold">
              Testimonials From
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary font-medium mt-2">
              Happy Customers
            </h2>
            <p className="mt-2 text-primary text-base font-medium max-w-2xl">
              Honest reviews of our trusted customers using Clovixstore Products
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-20">
            <Image
              src="/images/cross-plane.svg"
              alt="Cross Plane"
              width={160}
              height={120}
            />

            <div className="flex flex-col">
              <Image
                src="/images/groupCustomers.svg"
                alt="Group Customers"
                width={120}
                height={120}
              />
              <p className="text-neutral-600 text-sm font-medium mt-2 w-60">
                Real reviews of customers
              </p>
            </div>
          </div>
        </div>

        <div className="block lg:hidden px-4">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {customers.map((customer, idx) => (
              <SwiperSlide key={idx}>
                <CustomerCard customer={customer} idx={idx} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden lg:grid grid-cols-4 gap-6 p-4">
          {customers.map((customer, idx) => (
            <CustomerCard key={idx} customer={customer} idx={idx} />
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-between p-4 px-8">
          <p className="text-left text-neutral-600 text-base font-medium">
            These all are real reviews from the clients who used ClovixStore.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="w-3 h-3 rounded-full bg-primary opacity-40"></span>
            <span className="w-3 h-3 rounded-full bg-primary opacity-40"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCustomers;
