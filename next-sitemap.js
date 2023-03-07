/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://quran-app-ran.vercel.app/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  },
  sitemapSize: 10000
}
