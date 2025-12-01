import Image from "next/image";

const AboutClovixStore = () => {
  return (
    <section className="w-full bg-primary text-white py-10 sm:py-14 px-6 sm:px-10 lg:px-20 xl:px-30">
      <div className="max-w-5xl container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div>
            <h2 className="text-xl sm:text-3xl lg:text-3xl xl:text-4xl text-white font-medium">
              Get to Know About ClovixStore
            </h2>
            <p className="mt-4 text-white text-sm font-normal max-w-[525px]">
              At ClovixStore, we bring a curated selection of showpieces and
              decorative products to elevate your home or office spaces. Our
              mission is simple: provide unique, high-quality decor that adds
              elegance, charm, and personality to every corner of your life.
            </p>
          </div>
        </div>

        <div className="flex justify-center xl:justify-end relative">
          <div className="relative w-[320px] h-60">
            <Image
              src="/images/whiteplane.svg"
              alt="Cross plane illustration"
              fill
              sizes="(min-width: 1280px) 320px, 50vw"
              className="object-contain"
              priority
            />

            <div className="absolute bottom-4 right-24 w-32 h-20 rounded-md overflow-hidden">
              <Image
                src="/images/usa-flag.svg"
                alt="USA flag"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClovixStore;
