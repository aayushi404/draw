/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Replace with your image host
        // Optional: add port and pathname
      },
    ],
  }
};

export default nextConfig;
