/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}


export default nextConfig
