import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
      },
   eslint: {
      ignoreDuringBuilds: true,
    },
    async headers() {
        return [
        {
            source: "/api/:path*",
            headers: [
            {
                key: "Access-Control-Allow-Origin",
                value: "*",
            },
            {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
                key: "Access-Control-Allow-Headers",
                value: "X-Requested-With, Content-Type, Accept",
            },
            ],
        },
        ];
    },
};

export default nextConfig;
