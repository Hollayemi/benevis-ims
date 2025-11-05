/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const withPWAFunc = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                    maxEntries: 4,
                    maxAgeSeconds: 365 * 24 * 60 * 60
                }
            }
        },
        {
            urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-image-assets',
                expiration: {
                    maxEntries: 64,
                    maxAgeSeconds: 24 * 60 * 60
                }
            }
        },
    ]
});

const nextConfig = {
    reactStrictMode: true,

    // IMPORTANT: Enable standalone for Electron
    output: 'standalone',

    // Disable image optimization for Electron compatibility
    images: {
        unoptimized: true,
    },

    // Reduce bundle size
    webpack: (config, { isServer }) => {
        // Exclude sharp from client bundle
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },
};

export default withPWAFunc(nextConfig);