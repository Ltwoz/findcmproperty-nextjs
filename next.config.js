/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "media.discordapp.net",
            "cdn.discordapp.com",
            "cdnb.artstation.com",
            "dummyimage.com",
            "res.cloudinary.com",
            `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com`
        ],
    },
};

module.exports = nextConfig;
