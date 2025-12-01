"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import CartIcon from "./CartIcon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `${pathname === path ? "text-red-700" : "text-black"} text-sm font-normal`;

  return (
    <header className="bg-[#FFFF] border-b border-[#DBDBDB]">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5">
        <div className="flex items-center gap-x-1">
          <Link
            className="text-4xl font-medium text-primary! md:ml-2 ml-6"
            href="/"
          >
            Clovixstore
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-x-8 text-base text-primary">
          <CartIcon />
          <Link href="/about" className={linkClass("/about")}>
            About Us
          </Link>
        </nav>

        <button
          className="md:hidden text-xl text-gray-700 pe-6"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-5 pb-4">
          <nav className="flex flex-col items-center gap-y-4 text-center w-full text-primary">
            <CartIcon />

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={linkClass("/about")}
            >
              About Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
