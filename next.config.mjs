/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.simpleicons.org', 'localhost', 'paddle-billing.vercel.app'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://sandbox-cdn.paddle.com",
              "style-src 'self' 'unsafe-inline' https://cdn.paddle.com https://sandbox-cdn.paddle.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://cdn.paddle.com https://sandbox-cdn.paddle.com",
              "connect-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com https://sandbox-api.paddle.com https://api.paddle.com https://cdn.paddle.com https://sandbox-cdn.paddle.com https://*.supabase.co wss:",
              "frame-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
