import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
