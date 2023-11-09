/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "standalone",
    webpack: (config) => {
        // The below are required for the cardano serialization library
        config.experiments.asyncWebAssembly = true;
        config.experiments.topLevelAwait = true;
        config.module.exprContextCritical = false;

        // Important: return the modified config
        return config;
    },
    images: {
        remotePatterns: [
            { hostname: "saturnnft.io" },
            { hostname: "saturn-production.nyc3.digitaloceanspaces.com" },
            { hostname: "saturn-staging.nyc3.digitaloceanspaces.com" },
            { hostname: "saturn-sandbox.nyc3.digitaloceanspaces.com" },
            { hostname: "saturn-production.nyc3.cdn.digitaloceanspaces.com" },
            { hostname: "ipfs.io" },
            { hostname: "ipfs.blockfrost.dev" },
            { hostname: "localhost" },
            { hostname: "gateway.pinata.cloud" },
            { hostname: "nftstorage.link" },
            { hostname: "dweb.link" },
            { hostname: "cf-ipfs.com" },
            { hostname: "ipfs" },
        ],
    },
    // i18n: {
    //     locales: ['en'],
    //     defaultLocale: 'en',
    // },
};

module.exports = nextConfig;
