import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: 'latest',
  },
  images: {
    localPatterns: [
      {
        pathname: '/img/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
