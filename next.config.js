/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "media.discordapp.net",
            "cdn.discordapp.com",
            "cdnb.artstation.com",
            "dummyimage.com",
            "res.cloudinary.com"
        ],
    },
};

module.exports = nextConfig;
