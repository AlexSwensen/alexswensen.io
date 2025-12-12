import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
<<<<<<< HEAD
  /* config options here */
  turbopack: {
    root: path.join(__dirname, './'),
=======
  images: {
    localPatterns: [
      {
        pathname: '/img/**',
        search: '',
      },
    ],
>>>>>>> main
  },
};

export default nextConfig;
