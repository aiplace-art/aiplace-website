import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { ServicesGrid } from "@/components/sections/services-grid"
import { PortfolioGrid } from "@/components/sections/portfolio-grid"
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel"
import { ContactSection } from "@/components/sections/contact-section"
import { CTASection } from "@/components/sections/cta-section"

// Import motion for animations
const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
  ssr: false,
})

// Lazy load chat widget for performance
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidgetNew"), {
  ssr: false,
  loading: () => null,
})

export const metadata: Metadata = {
  title: "Home",
  description:
    "AiPlace - Your partner in web development, AI solutions, business planning, and tokenomics design. Build better, ship faster with cutting-edge technology.",
  openGraph: {
    title: "AiPlace - Digital Innovation & AI Solutions",
    description:
      "Premium web development, AI solutions, and strategic planning for forward-thinking companies.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AiPlace - Where Creativity Meets AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AiPlace - Digital Innovation & AI Solutions",
    description:
      "Premium web development, AI solutions, and strategic planning for forward-thinking companies.",
    images: ["/twitter-image.jpg"],
  },
}

export default function Home() {
  return (
    <>
      <main className="relative overflow-hidden scroll-smooth">
        {/* UNIFIED BACKGROUND - Single gradient for entire page */}
        <div className="fixed inset-0 -z-10">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />

          {/* Radial accent gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]" />

          {/* Subtle grid pattern across entire page */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
        </div>

        {/* SEAMLESS SECTIONS - All flow together as ONE with consistent vertical rhythm */}
        <div className="relative">
          {/* Hero Section - No top padding, natural hero height */}
          <section id="hero" className="scroll-mt-24">
            <Hero />
          </section>

          {/* Services Section - Consistent container & padding */}
          <section id="services" className="scroll-mt-24 py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
              <ServicesGrid />
            </div>
          </section>

          {/* Portfolio Section - Consistent container & padding */}
          <section id="portfolio" className="scroll-mt-24 py-16 md:py-20 bg-gradient-to-b from-white via-gray-100 to-gray-950">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
              <PortfolioGrid />
            </div>
          </section>

          {/* Testimonials Section - Consistent container & padding */}
          <section id="testimonials" className="scroll-mt-24 py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
              <TestimonialCarousel />
            </div>
          </section>

          {/* Contact Section - Consistent padding & narrower container for better readability */}
          <ContactSection />

          {/* Final CTA Section - Consistent padding & container */}
          <CTASection />

          {/* Minimal bottom spacing */}
          <div className="h-8 md:h-12" />
        </div>
      </main>

      {/* Chat Widget - Lazy loaded */}
      <ChatWidget />
    </>
  )
}
