const path = require('path');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.stonediscover.co.uk",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  sitemapSize: 50000,
  outDir: './public', // ✅ puts sitemap in /public
  sourceDir: path.resolve(__dirname, '.next'), // ✅ ensures it finds build files

  exclude: [
    "/blog/preview*",
    "/blog/tag*",
    "/blog/category*",
    "/blog/index-oold",
    "/blog/author*",
    "/thank-you",
    "/product"
  ],

  additionalPaths: async (config) => {
    const manualUrls = [
    //   "/tombstones-monuments/angel/",
    ];

    // ✅ Make sure to await or return a resolved promise
    const results = await Promise.all(
      manualUrls.map((url) => config.transform(config, url))
    );

    return results;
  },
};
