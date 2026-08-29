import './globals.css';
import './docs-styles.css';

export const metadata = {
  title: 'DataMint | Turn Google Maps Into a Client Machine with AI',
  description:
    'DataMint AI scrapes verified B2B leads from Google Maps, detects active WhatsApp numbers in real time, and enriches contact data in seconds.',
  keywords:
    'DataMint, Google Maps scraper, lead generation, WhatsApp verification, B2B leads, data enrichment, AI lead extraction, B2B outreach',
  authors: [{ name: 'MSU Digital Studio' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: { canonical: 'https://datamint.online/' },
  openGraph: {
    type: 'website',
    siteName: 'DataMint',
    url: 'https://datamint.online/',
    title: 'DataMint AI | Turn Google Maps Into a Client Machine',
    description:
      'Auto-scrape verified B2B leads from Google Maps, detect active WhatsApp numbers in real time, and enrich contact data in seconds.',
    images: [
      {
        url: 'https://datamint.online/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'DataMint AI | Turn Google Maps Into a Client Machine',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataMint AI | Turn Google Maps Into a Client Machine',
    description:
      'Auto-scrape verified B2B leads from Google Maps, detect active WhatsApp numbers in real time, and enrich contact data in seconds.',
    images: ['https://datamint.online/og-image.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#21883D',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* Inline theme script — must run before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('dm-theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'SoftwareApplication',
                  name: 'DataMint',
                  url: 'https://datamint.online',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web, Chrome Extension',
                  description:
                    'AI-powered Google Maps lead extraction, WhatsApp verification, and data enrichment engine.',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                    description: 'Membership plans available',
                  },
                  provider: {
                    '@type': 'Organization',
                    name: 'MSU Digital Studio',
                    url: 'https://datamint.online',
                  },
                },
                {
                  '@type': 'WebSite',
                  name: 'DataMint',
                  url: 'https://datamint.online',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://datamint.online/#playground',
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
