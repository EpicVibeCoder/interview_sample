/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer modern formats when available.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // YouTube thumbnail previews in testimonials.
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
