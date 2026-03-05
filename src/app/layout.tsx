import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "كيف الضيافة | خدمات الضيافة الفاخرة في المملكة",
  description:
    "منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية - قهوة، شاي، تقديمات راقية وفريق احترافي.",
  keywords:
    "كيف الضيافة, خدمات الضيافة, ضيافة فاخرة, قهوة سعودية, ضيافة الرياض, مضيفون مضيفات, تقديمات فاخرة, معدات ضيافة",
  metadataBase: new URL("https://keifaldiafa.com"),
  openGraph: {
    type: "website",
    siteName: "كيف الضيافة",
    locale: "ar_SA",
    title: "كيف الضيافة | خدمات الضيافة الفاخرة في المملكة",
    description:
      "منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية - قهوة، شاي، تقديمات راقية وفريق احترافي.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "كيف الضيافة",
    "mobile-web-app-capable": "yes",
    "application-name": "كيف الضيافة",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "كيف الضيافة",
              alternateName: "Keif Al-Diafa",
              description:
                "خدمات الضيافة الفاخرة في المملكة العربية السعودية - قهوة سعودية، شاي، تقديمات وفريق احترافي",
              url: "https://keifaldiafa.com",
              telephone: "+966535636933",
              email: "info@keifdiafa.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SA",
                addressLocality: "الرياض",
                addressRegion: "منطقة الرياض",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 24.7136,
                longitude: 46.6753,
              },
              openingHours: "Mo-Su 08:00-00:00",
              priceRange: "$$$$",
              servesCuisine: "Arabic Hospitality",
              areaServed: "Saudi Arabia",
              sameAs: [
                "https://instagram.com/keifdiafa",
                "https://wa.me/966535636933",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#0f0f0f] text-[#F5F5DC] antialiased">
        {children}
      </body>
    </html>
  );
}
