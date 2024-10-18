/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : true,
    env: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    },
    images : {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'localhost',
            },
            {
              protocol: 'https',
              hostname: 'assets.aceternity.com',
            },
            {
              protocol: 'https',
              hostname: 'avatar.vercel.sh',
            },
            {
              protocol: 'https',
              hostname: 'images.unsplash.com',
            },
            {
              protocol: 'https',
              hostname: 'picsum.photos',
            },
            {
              protocol: 'https',
              hostname: 'utfs.io',
            },
          ],
    }
};

export default nextConfig;
