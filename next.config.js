/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: { removeConsole: !isDev }
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev
})

module.exports = withPWA(nextConfig)
