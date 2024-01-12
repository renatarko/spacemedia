/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Adicione outros cabeçalhos, se necessário
        ],
      },
      {
        source: "/my-media-space",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Adicione outros cabeçalhos, se necessário
        ],
      },
    ];
  },
};

module.exports = nextConfig;
