/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/*/**',
      }
    ]
  },
  cacheHandler: require.resolve('next/dist/server/lib/incremental-cache/file-system-cache.js'),
};

module.exports = nextConfig;