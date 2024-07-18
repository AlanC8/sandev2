const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qazaqrepublic.com',
        port: '',
        pathname: '/uploads/thumbs/**',
      },
    ],
  },
};

export default nextConfig;
