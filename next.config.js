/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce bundle size
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Turbopack configuration
  turbopack: {
    // Add Turbopack-specific optimizations here if needed
  },
  // Memory optimizations for webpack (fallback)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              name: 'framework',
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
                );
              },
              name(module) {
                const hash = require('crypto').createHash('sha1');
                hash.update(module.identifier());
                return hash.digest('hex').slice(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name: 'shared',
              chunks: 'all',
              minChunks: 2,
              priority: 10,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
