import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Providers } from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "AiPlace - Digital Innovation & AI Solutions",
    template: "%s | AiPlace"
  },
  description: "Your partner in web development, AI solutions, business planning, and tokenomics design. Transforming businesses with cutting-edge technology and strategic expertise.",
  keywords: [
    "web development",
    "AI solutions",
    "artificial intelligence",
    "business planning",
    "tokenomics",
    "blockchain consulting",
    "digital innovation",
    "custom software development",
    "machine learning",
    "web3 consulting"
  ],
  authors: [{ name: "AiPlace", url: "https://aiplace.com" }],
  creator: "AiPlace",
  publisher: "AiPlace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AiPlace - Digital Innovation & AI Solutions",
    description: "Transforming businesses with cutting-edge technology and strategic expertise",
    siteName: "AiPlace",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AiPlace - Digital Innovation & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AiPlace - Digital Innovation & AI Solutions",
    description: "Transforming businesses with cutting-edge technology and strategic expertise",
    images: ["/twitter-image.jpg"],
    creator: "@aiplace",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white min-h-screen`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
