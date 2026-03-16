import { Inter } from "next/font/google";
import { Metadata, Viewport } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://luxecart.com"),
  title: "Premium Fashion & Luxury Clothing | LuxeCart - Free Shipping",
  description:
    "Shop exclusive luxury fashion, designer clothing & accessories. Free shipping on orders over $50. Trusted by thousands. Premium quality guaranteed.",
  keywords:
    "luxury fashion, designer clothing, premium fashion, online shopping, luxury brands, fashion essentials",
  authors: [{ name: "LuxeCart" }],
  creator: "LuxeCart",
  publisher: "LuxeCart",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxecart.com",
    title: "Premium Fashion & Luxury Clothing | LuxeCart",
    description:
      "Discover exclusive luxury fashion and designer clothing. Free shipping on orders over $50.",
    siteName: "LuxeCart",
    images: [
      {
        url: "https://luxecart.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LuxeCart - Premium Fashion Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Fashion & Luxury Clothing | LuxeCart",
    description: "Exclusive designer clothing and luxury fashion items",
    creator: "@luxecart",
    images: ["https://luxecart.com/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://luxecart.com",
  },
  category: "Fashion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Skip Navigation Link */}
        <style>{`
          .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: #000;
            color: #fff;
            padding: 0.5rem 1rem;
            text-decoration: none;
            z-index: 100;
            border-radius: 0 0 4px 0;
          }
          .skip-link:focus {
            top: 0;
          }
        `}</style>
        {/* Enable fast 3G preloading */}
        <link rel="preload" as="style" href="/globals.css" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>

        {/* Prefetch DNS for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Organization Schema - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LuxeCart",
              url: "https://luxecart.com",
              logo: "https://luxecart.com/logo.png",
              description:
                "Premium fashion and luxury clothing store with free shipping",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-000-000-0000",
                contactType: "Customer Service",
                email: "support@luxecart.com",
              },
              sameAs: [
                "https://www.instagram.com/luxecart",
                "https://www.facebook.com/luxecart",
                "https://www.twitter.com/luxecart",
              ],
            }),
          }}
        />

        {/* Website Schema - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "LuxeCart",
              url: "https://luxecart.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://luxecart.com/collection?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
