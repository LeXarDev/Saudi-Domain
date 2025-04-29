/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
};

module.exports = nextConfig;
