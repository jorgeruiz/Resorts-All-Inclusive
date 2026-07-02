import type { Metadata } from "next";
import { Raleway, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import CallModal from "@/components/CallModal";
import FloatingCallButtons from "@/components/FloatingCallButtons";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
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
    "Agencia de viajes especializada en paquetes todo incluido: Cancún, Puerto Vallarta, Los Cabos, Mazatlán, Cozumel y Huatulco. Vuelo + hotel + alimentos incluidos. Precio más bajo garantizado. Más de 5,000 clientes. ☎ 800 228 8377.",
  keywords: [
    // Términos principales
    "paquetes all inclusive México",
    "resorts all inclusive México",
    "paquetes todo incluido México",
    "paquetes vacacionales todo incluido",
    "hoteles todo incluido México",
    "agencia de viajes todo incluido",
    "agencia de viajes all inclusive en línea",
    "ofertas de viaje todo incluido México",
    // Por destino — Cancún
    "paquetes Cancún todo incluido",
    "paquetes vacacionales Cancún todo incluido",
    "resorts all inclusive Cancún",
    "hoteles todo incluido Cancún baratos",
    "hotel Riu Cancún paquetes",
    "hotel Xcaret paquetes todo incluido",
    "hotel Krystal Cancún todo incluido",
    "Dreams Resort Cancún paquetes",
    // Por destino — otros
    "paquetes todo incluido Puerto Vallarta",
    "resorts Puerto Vallarta all inclusive",
    "paquetes Los Cabos todo incluido",
    "hotel todo incluido Los Cabos",
    "paquetes Mazatlán todo incluido",
    "paquetes Cozumel todo incluido",
    "paquetes Huatulco todo incluido",
    // Long-tail y variantes
    "paquetes vuelo y hotel todo incluido México",
    "vacaciones todo incluido familia México",
    "viaje de pareja todo incluido México",
    "luna de miel all inclusive México",
    "paquetes Semana Santa todo incluido",
    "paquetes vacaciones todo incluido baratos",
    "mejor precio hotel todo incluido México",
    "paquetes 3 días 2 noches todo incluido",
    "reservar hotel all inclusive México",
    "precio más bajo garantizado hotel México",
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
      "Paquetes todo incluido en Cancún, Puerto Vallarta, Los Cabos, Mazatlán y más. Vuelo + hotel + alimentos. Precio más bajo garantizado. +5,000 clientes satisfechos.",
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
    description:
      "Paquetes todo incluido en Cancún, Puerto Vallarta, Los Cabos y más. Precio más bajo garantizado. ☎ 800 228 8377.",
    images: ["https://resorts-allinclusive.com/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  other: {
    // Geolocalización — importante para SEO local México
    "geo.region": "MX",
    "geo.placename": "México",
    // UI / PWA
    "theme-color": "#0C2340",
    "application-name": "Resorts All Inclusive",
    // Clasificación de contenido
    "category": "travel",
    "rating": "general",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Resorts All Inclusive",
  url: "https://resorts-allinclusive.com",
  logo: "https://resorts-allinclusive.com/logo.png",
  image: "https://resorts-allinclusive.com/og-default.jpg",
  description:
    "Agencia de viajes en línea especializada en paquetes vacacionales todo incluido en los principales destinos de México: Cancún, Puerto Vallarta, Los Cabos, Mazatlán, Cozumel y Huatulco. Vuelo, hotel y alimentos incluidos al mejor precio del mercado.",
  telephone: "+528002288377",
  priceRange: "$$ - $$$",
  currenciesAccepted: "MXN",
  paymentAccepted: "Cash, Credit Card",
  openingHours: ["Mo-Fr 10:00-17:00", "Sa-Su 10:00-14:00"],
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paquetes Vacacionales Todo Incluido",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Trip",
          name: "Paquete Todo Incluido Cancún — Hotel Riu",
          description: "Resort todo incluido en Cancún con restaurantes ilimitados, bares 24 hrs, actividades acuáticas y entretenimiento nocturno.",
        },
        priceCurrency: "MXN",
        price: "26475",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Trip",
          name: "Paquete Todo Incluido Cancún — Hotel Xcaret",
          description: "Resort con acceso al parque Xcaret y Xavage, playa privada y shows nocturnos.",
        },
        priceCurrency: "MXN",
        price: "33463",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Trip",
          name: "Paquete Todo Incluido Cancún — Hotel Krystal",
          description: "Excelente relación calidad-precio en la zona hotelera de Cancún con alberca infinita y spa.",
        },
        priceCurrency: "MXN",
        price: "18668",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Trip",
          name: "Paquete Todo Incluido — Dreams Resort",
          description: "Paquete todo incluido accesible con traslados incluidos, playa equipada y actividades diarias.",
        },
        priceCurrency: "MXN",
        price: "10147",
        availability: "https://schema.org/InStock",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${raleway.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KPXN2KB2');`,
          }}
        />
        {/* Google Ads (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18234493762" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-18234493762');`,
          }}
        />
        {/* Google Ads — Phone conversion tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `gtag('config', 'AW-18234493762/G7kXCN3_1skcEMKW8fZD', {'phone_conversion_number': '800 228 8377'});`,
          }}
        />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KPXN2KB2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Contenido para crawlers sin JS */}
        <noscript>
          <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Resorts All Inclusive México — Paquetes Todo Incluido al Mejor Precio</h1>
            <p>Somos una agencia de viajes en línea especializada en paquetes vacacionales todo incluido en los principales destinos de México: Cancún, Puerto Vallarta, Los Cabos, Mazatlán, Cozumel y Huatulco. Vuelo, hotel, alimentos y diversión incluidos sin cargos ocultos.</p>
            <p>Más de 5,000 familias y parejas nos eligen cada año. Precio más bajo garantizado.</p>
            <h2>Destinos disponibles</h2>
            <ul>
              <li>Cancún — El destino todo incluido más popular de México</li>
              <li>Puerto Vallarta — Joya del Pacífico mexicano</li>
              <li>Los Cabos — Lujo en Baja California Sur</li>
              <li>Mazatlán — La Perla del Pacífico</li>
              <li>Cozumel — Paraíso del buceo en el Caribe</li>
              <li>Huatulco — Nueve bahías paradisíacas en Oaxaca</li>
            </ul>
            <h2>Paquetes desde $10,147 MXN por persona</h2>
            <p>Hotel Riu, Hotel Xcaret, Hotel Krystal, Dreams Resort. 3 días · 2 noches · 2 adultos · Todo incluido.</p>
            <p>Llama para reservar: 800 228 8377. Atención 7 días a la semana.</p>
          </div>
        </noscript>
        <SmoothScroll />
        <CustomCursor />
        {children}

        {/* Spacer para que el fixed bottom bar mobile no tape el contenido */}
        <div className="h-16 md:hidden" aria-hidden="true" />

        <FloatingCallButtons />
        <CallModal />
      </body>
    </html>
  );
}
