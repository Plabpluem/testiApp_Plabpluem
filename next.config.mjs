/** @type {import('next').NextConfig} */
const nextConfig = {
    image: {
        remotePatterns: [
            {
             protocol: 'https',
             hostname: 'fakestoreapi.com',
             port: '',
            },
         ],
    },
};

export default nextConfig;
