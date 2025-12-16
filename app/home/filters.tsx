"use client";

import React, { useState } from "react";
import { InputNumber, Slider } from "antd";

const ProductFilters: React.FC = () => {
  const [filterType, setFilterType] = useState<"cheapest" | "best">("cheapest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  const MAX_PRICE = 100;

  return (
    <div className="bg-white relative max-w-5xl mx-auto border rounded-t-2xl border-[#DBDBDB] pt-3 shadow-xs">
      <div className="grid grid-cols-11 sm:gap-4 gap-2 border-[#DBDBDB] relative">
        <div className="sm:col-span-5 col-span-6 grid grid-cols-4">
          <div
            className={`col-span-2 relative flex flex-col cursor-pointer md:mt-0 mt-2 ${
              filterType === "cheapest" ? "text-primary" : "text-[#112211]"
            } before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-px before:bg-[#D7E2EE]`}
            onClick={() => setFilterType("cheapest")}
          >
            <button className="w-full text-sm sm:text-lg font-semibold flex flex-col items-center sm:items-start sm:pl-7 gap-0.5">
              <span>Cheapest</span>
              <span className="hidden md:inline text-sm text-gray-500 font-normal">
                Budget friendly.
              </span>
            </button>

            {filterType === "cheapest" && (
              <span className="w-full border-t-4 border-primary mt-4" />
            )}
          </div>

          <div
            className={`col-span-2 relative flex flex-col cursor-pointer md:mt-0 mt-2 ${
              filterType === "best" ? "text-primary" : "text-[#112211]"
            }`}
            onClick={() => setFilterType("best")}
          >
            <button className="w-full text-sm sm:text-lg font-semibold flex flex-col items-center sm:items-start sm:pl-6 gap-0.5">
              <span>Best</span>
              <span className="hidden md:inline text-sm text-gray-500 font-normal">
                Comfort & Luxury
              </span>
            </button>

            {filterType === "best" && (
              <span className="w-full border-t-4 border-primary mt-4" />
            )}
          </div>
        </div>

        <div className="sm:col-span-6 col-span-4 pe-2 grid grid-cols-4 sm:gap-3 gap-1 items-center pb-2">
          <div className="sm:col-span-3 col-span-2 flex items-center gap-3">
            <label className="hidden md:block text-xs sm:text-lg font-medium">
              Price
            </label>

            <Slider
              min={0}
              max={MAX_PRICE}
              value={priceRange[1]}
              onChange={(value) => setPriceRange([0, Number(value)])}
              tooltip={{ formatter: (value) => `$${value}` }}
              className="w-full"
              styles={{
                rail: {
                  backgroundColor: "#E5E5E5",
                  height: 6,
                },
                track: {
                  backgroundColor: "#00a388",
                  height: 6,
                },
              }}
            />
          </div>

          <div className="sm:col-span-1 col-span-2">
            <InputNumber
              size="large"
              value={priceRange[1]}
              min={0}
              max={MAX_PRICE}
              prefix={<span className="text-gray-500">$</span>}
              onChange={(val) => setPriceRange([0, Number(val ?? 0)])}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as any}
              className="w-full text-base font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
