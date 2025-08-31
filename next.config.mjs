/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  assetPrefix: '/',        // 🔑 Custom domain uchun
  basePath: '',            // 🔑 Custom domain uchun
}


export default nextConfig
