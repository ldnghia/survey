/** @type {import('next').NextConfig} */

// eslint-disable-next-line no-unused-vars
module.exports = (phase, { defaultConfig }) => {
    const nextConfig = {
        reactStrictMode: false,
        compiler: {
            styledComponents: true,
        },
        webpack: (config) => {
            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            })
            return config
        },
        output:
            process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
        experimental: {
            optimizePackageImports: ['antd'],
        },
    }

    return nextConfig
}
