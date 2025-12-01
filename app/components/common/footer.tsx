import Link from "next/link";

import { FacebookFilled, InstagramFilled } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden xl:h-[350px] lg:h-[350px] md:h-full h-full sm:h-96 bg-primary text-white py-10">
      <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 opacity-5 pointer-events-none hidden lg:block">
        <h1 className="text-[300px] font-medium text-white leading-none select-none">
          Clovixstore
        </h1>
      </div>

      <div className="pt-2">
        <div className="lg:hidden text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-medium mb-4">Clovixstore</h1>
            <p className="text-base">
              At ClovixStore, we bring a curated selection of showpieces and
              decorative products to elevate your home or office spaces. Our
              mission is simple: provide unique, high-quality decor that adds
              elegance, charm, and personality to every corner of your life.
            </p>
          </div>
          <div className="flex flex-col space-y-10 mb-10">
            <div>
              <h3 className="mb-4 text-white text-2xl font-medium">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="opacity-70 text-xl font-normal"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="opacity-70 text-xl font-normal"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6 text-center">
            <h3 className="mb-3 text-white text-2xl font-medium">Follow Us</h3>
            <div className="flex justify-center space-x-4 text-2xl">
              <Link href="#" className="hover:text-white">
                <FacebookFilled />
              </Link>
              <Link href="#" className="hover:text-white">
                <InstagramFilled />
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden max-w-5xl mx-auto lg:grid lg:grid-cols-3 mt-2 gap-8 px-4">
          <div className="lg:order-1">
            <h3 className="mb-4 text-base font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="opacity-70 text-base font-normal"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="opacity-70 text-base font-normal"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:order-2 lg:text-center">
            <h1 className="text-6xl font-medium mb-4">Clovixstore</h1>
            <p className="text-base">
              At ClovixStore, we bring a curated selection of showpieces and
              decorative products to elevate your home or office spaces. Our
              mission is simple: provide unique, high-quality decor that adds
              elegance, charm, and personality to every corner of your life.
            </p>
          </div>

          <div className="lg:order-3 lg:text-right">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 lg:justify-end">
              <Link href="#" className="hover:text-white text-xl">
                <FacebookFilled />
              </Link>
              <Link href="#" className="hover:text-white text-xl">
                <InstagramFilled />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 pt-4 border-t border-gray-200">
          <p>© 2025 Clovixstore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
