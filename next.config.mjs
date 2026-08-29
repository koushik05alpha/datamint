/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/docs.html', destination: '/docs' },
      { source: '/resource.html', destination: '/resource' },
      { source: '/roadmap.html', destination: '/roadmap' },
      { source: '/privacy.html', destination: '/privacy' },
      { source: '/terms.html', destination: '/terms' },
      { source: '/refund.html', destination: '/refund' },
      { source: '/docs/:slug.html', destination: '/docs/:slug' },
    ];
  },
};

export default nextConfig;
