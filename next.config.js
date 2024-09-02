/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Avoiding CORS issues
    async rewrites() {
        return [
            {
                source: '/contact-management/v1/:slug*',
                destination: `${process.env.API_BACKEND}/contact-management/v1/:slug*`,
            },
        ]
    },
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
}

module.exports = nextConfig
