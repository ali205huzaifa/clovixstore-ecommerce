import Image from "next/image";

export default function ProductCard({ product }: any) {
  const { name, price, img, category, description } = product;
  const categoryName = typeof category === "object" ? category?.name : category;

  return (
    <div className="text-black border border-[#DEDEDE] bg-[#FEFEFE] overflow-hidden shadow-md flex flex-col h-full p-5 rounded-[1.875rem] transition-all hover:shadow-2xl hover:scale-[101%]">
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={img}
          alt={name}
          fill
          quality={80}
          className="object-cover rounded-t-3xl"
        />

        {category && (
          <div className="absolute top-4 left-3 md:left-7 z-40">
            <p className="bg-white text-xxs xl:text-xs font-bold px-2 xl:px-3 py-1 rounded-full text-primary uppercase">
              {categoryName}
            </p>
          </div>
        )}
      </div>

      <div className="pt-3 flex flex-col grow">
        <h2 className="paragraph-lg font-semibold my-4 line-clamp-2">{name}</h2>

        <p className="text-[#565656] text-sm mb-4 line-clamp-3">
          {description}
        </p>

        <div className="mt-auto">
          <div className="border-t border-[#E8E8E8] my-3"></div>

          <div className="flex justify-between items-center gap-5">
            <h3 className="paragraph-lg font-semibold text-primary">
              {categoryName ?? "Product"}
            </h3>

            <h3 className="text-base font-medium">
              <span className="text-primary font-semibold">${price}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
