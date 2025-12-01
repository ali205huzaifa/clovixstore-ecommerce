"use client";

import React, { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const ClovixFaqs = () => {
  const faqs = [
    {
      question: "What materials are your showpieces made of?",
      answer:
        "Our showpieces are crafted using premium materials such as resin, crystal, metal, and handcrafted wood, ensuring durability and elegance.",
    },
    {
      question: "Are the colors and designs exactly as shown in pictures?",
      answer:
        "Yes, we use high-quality product photography. Minor variations may occur due to lighting, but the final product closely matches the displayed images.",
    },
    {
      question: "Do you offer fragile-item safe packaging?",
      answer:
        "Absolutely! All showpieces are packed with multi-layer protective material to ensure safe delivery without damage.",
    },
    {
      question: "Can I customize a showpiece or request a special design?",
      answer:
        "Yes, we offer limited customization options for selected showpieces, including color variations and personalized engravings.",
    },
    {
      question: "Do you provide cash-on-delivery and fast shipping?",
      answer:
        "Yes, we offer COD in most cities and provide fast shipping nationwide with secure, tracked delivery.",
    },
    {
      question: "What should I do if my showpiece arrives damaged?",
      answer:
        "In the rare case of damage, contact our support within 24 hours, and we will offer a replacement or refund as per our policy.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-white py-6 px-4">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-center text-xl sm:text-base lg:text-3xl font-semibold text-primary mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-lg overflow-hidden transition ${
                openIndex === idx
                  ? "border-primary shadow-md"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className={`w-full flex justify-between items-center text-left font-medium transition py-6 ${
                  openIndex === idx
                    ? "bg-primary text-white px-12 py-6"
                    : "bg-white text-gray-800 px-12 py-6 hover:bg-gray-50"
                }`}
              >
                <span className="text-base lg:text-xl">{`${idx + 1}. ${
                  faq.question
                }`}</span>
                {openIndex === idx ? (
                  <MinusOutlined className="text-lg" />
                ) : (
                  <PlusOutlined className="text-lg" />
                )}
              </button>

              {openIndex === idx && (
                <div className="px-12 pb-6 -mt-4 text-base text-white bg-primary">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClovixFaqs;
