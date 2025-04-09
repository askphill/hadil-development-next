// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  // must match Contentful locales
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: { modern: true },
  trailingSlash: true,
  images: {
    domains: ['images.ctfassets.net', 'cdn.shopify.com'],
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});
