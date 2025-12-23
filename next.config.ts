/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "usc1.contabostorage.com",
      },
    ],
    qualities: [75, 80],
  },
};

module.exports = nextConfig;
