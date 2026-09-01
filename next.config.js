/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'

const defaultRuntimeCaching = require('next-pwa/cache')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: { removeConsole: !isDev },
  // Inline critical CSS (critters) agar stylesheet tidak render-blocking di mobile
  experimental: { optimizeCss: true }
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
  runtimeCaching: [
    // Cache respons API eQuran (terutama tafsir yang di-fetch client-side) agar
    // buka ulang tafsir instan dan tetap tersedia saat offline
    {
      urlPattern: /^https:\/\/equran\.id\/api\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'equran-api',
        expiration: { maxEntries: 128, maxAgeSeconds: 30 * 24 * 60 * 60 }
      }
    },
    ...defaultRuntimeCaching
  ]
})

module.exports = withPWA(nextConfig)
