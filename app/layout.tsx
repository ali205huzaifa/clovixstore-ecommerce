import type { Metadata } from "next";
import { Urbanist, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import { CartProvider } from "./context/CartContext";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Clovixstore",
  description:
    "Modern ecommerce store where we are uplifting purchasing Experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${urbanist.variable} 
          ${poppins.variable} 
          ${urbanist.className} 
          antialiased
        `}
      >
        <CartProvider>
          <Header />
          <main className="w-full min-h-screen py-2">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
