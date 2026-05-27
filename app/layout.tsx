import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resorts All Inclusive México — Paquetes Todo Incluido al Mejor Precio",
  description:
    "Agencia de viajes especializada en paquetes vacacionales todo incluido en los mejores destinos de México: Cancún, Puerto Vallarta, Los Cabos y más. Precios más bajos garantizados. Llama: 800 228 8377.",
  keywords: [
    "paquetes all inclusive México",
    "resorts all inclusive baratos México",
    "paquetes vacacionales todo incluido",
    "paquetes vacacionales Cancún todo incluido",
    "paquetes todo incluido Puerto Vallarta",
    "agencia de viajes all inclusive en línea",
    "ofertas de viaje todo incluido",
  ],
  alternates: {
    canonical: "https://resorts-allinclusive.com/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://resorts-allinclusive.com/",
    siteName: "Resorts All Inclusive",
    title: "Resorts All Inclusive México — Paquetes Todo Incluido al Mejor Precio",
    description:
      "Paquetes vacacionales todo incluido en los principales destinos de México con los mejores precios del mercado.",
    images: [
      {
        url: "https://resorts-allinclusive.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Resorts All Inclusive México — Paquetes Todo Incluido",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resorts All Inclusive México — Paquetes Todo Incluido al Mejor Precio",
    description: "Paquetes vacacionales todo incluido con los mejores precios del mercado en México.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Resorts All Inclusive",
  url: "https://resorts-allinclusive.com",
  logo: "https://resorts-allinclusive.com/logo.png",
  description:
    "Agencia de viajes en línea especializada en paquetes vacacionales todo incluido en los principales destinos de México, con los mejores precios del mercado.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+528002288377",
    contactType: "reservations",
    availableLanguage: "Spanish",
    hoursAvailable: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "14:00",
      },
    ],
  },
  areaServed: {
    "@type": "Country",
    name: "México",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
