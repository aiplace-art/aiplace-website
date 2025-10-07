"use client"

import React, { useState, useEffect } from "react"
import { ExternalLink, ArrowRight, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortfolioItem } from "@/types"
import { PortfolioModal } from "./portfolio-modal"
import { useTranslation } from "@/lib/i18n/hooks"

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    client: "TechRetail Co.",
    category: "Web Development",
    description: "Complete redesign and development of a high-traffic e-commerce platform",
    image: "/portfolio/ecommerce.jpg",
    tags: ["Next.js", "Tailwind", "Stripe"],
    results: [
      { metric: "Conversion Rate", value: "+45%" },
      { metric: "Page Load Time", value: "-60%" },
    ],
    slug: "ecommerce-redesign",
  },
  {
    id: "2",
    title: "AI Chatbot Integration",
    client: "FinanceHub",
    category: "AI Solutions",
    description: "Custom AI chatbot for customer support automation",
    image: "/portfolio/chatbot.jpg",
    tags: ["GPT-4", "Python", "React"],
    results: [
      { metric: "Response Time", value: "-80%" },
      { metric: "Customer Satisfaction", value: "+35%" },
    ],
    slug: "ai-chatbot",
  },
  {
    id: "3",
    title: "Startup Pitch Deck",
    client: "InnovateTech",
    category: "Business Planning",
    description: "Comprehensive business plan and investor pitch deck",
    image: "/portfolio/pitch.jpg",
    tags: ["Strategy", "Financial Modeling"],
    results: [
      { metric: "Funding Raised", value: "$2.5M" },
      { metric: "Investor Interest", value: "+120%" },
    ],
    slug: "startup-pitch",
  },
  {
    id: "4",
    title: "DeFi Token Launch",
    client: "CryptoVentures",
    category: "Tokenomics",
    description: "Complete tokenomics design and smart contract development",
    image: "/portfolio/defi.jpg",
    tags: ["Solidity", "Ethereum", "Web3"],
    results: [
      { metric: "Token Holders", value: "10K+" },
      { metric: "TVL", value: "$5M" },
    ],
    slug: "defi-token",
  },
  {
    id: "5",
    title: "Healthcare Portal",
    client: "MediCare Plus",
    category: "Web Development",
    description: "HIPAA-compliant patient management system",
    image: "/portfolio/healthcare.jpg",
    tags: ["React", "Node.js", "PostgreSQL"],
    results: [
      { metric: "Patient Processing", value: "+70%" },
      { metric: "Error Rate", value: "-90%" },
    ],
    slug: "healthcare-portal",
  },
  {
    id: "6",
    title: "Computer Vision System",
    client: "ManufactureAI",
    category: "AI Solutions",
    description: "Quality control automation using computer vision",
    image: "/portfolio/vision.jpg",
    tags: ["TensorFlow", "OpenCV", "Python"],
    results: [
      { metric: "Defect Detection", value: "99.8%" },
      { metric: "Cost Reduction", value: "-40%" },
    ],
    slug: "computer-vision",
  },
]

const categoryKeys = [
  { key: "portfolio.categories.all", value: "All" },
  { key: "portfolio.categories.webDev", value: "Web Development" },
  { key: "portfolio.categories.ai", value: "AI Solutions" },
  { key: "portfolio.categories.business", value: "Business Planning" },
  { key: "portfolio.categories.tokenomics", value: "Tokenomics" },
]

export function PortfolioGrid() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  const handleOpenModal = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedItem(null), 300)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-950 section-spacing-md">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("portfolio.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t("portfolio.description")}
          </p>
        </div>

        {/* Category filter with enhanced active state */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {categoryKeys.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "secondary"}
              onClick={() => setSelectedCategory(category.value)}
              className={`rounded-full px-6 py-2.5 transition-all duration-500 portfolio-filter-btn ${
                selectedCategory === category.value
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/50 scale-105"
                  : "bg-gray-800 hover:bg-gray-700 border-gray-700 hover:scale-105"
              }`}
            >
              {t(category.key)}
            </Button>
          ))}
        </div>

        {/* Portfolio grid with masonry-style layout and staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 grid-gap-md">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`portfolio-card h-full animate-fade-in-up opacity-0`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <Card className="h-full group overflow-hidden border-white/10 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 bg-gray-900 portfolio-card-hover">
                {/* Image with 4:3 aspect ratio and zoom effect */}
                <div className="relative aspect-[4/3] overflow-hidden cursor-pointer portfolio-image-container" onClick={() => handleOpenModal(item)}>
                  {/* Base gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 portfolio-image-zoom" />

                  {/* Overlay gradient that shifts on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                  {/* Hover effect icons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4">
                    <div className="portfolio-icon-hover opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                      <div className="p-4 rounded-full bg-white/20 backdrop-blur-md">
                        <Eye className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Category badge with gradient background */}
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 backdrop-blur-md text-white border-white/30 px-3 py-1 text-sm">
                    {item.category}
                  </Badge>
                </div>

                <CardContent className="p-5 md:p-6 space-y-4 card-spacing">
                  {/* Title and client */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400">{item.client}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-300 line-clamp-2 leading-relaxed">{item.description}</p>

                  {/* Tags with gradient backgrounds */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs md:text-sm bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30 text-indigo-300 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300 px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs md:text-sm bg-gray-800 border-gray-700 text-gray-400 px-3 py-1">
                        +{item.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    {item.results.map((result, i) => (
                      <div key={i}>
                        <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {result.value}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400 mt-1">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="ghost"
                      className="flex-1 justify-between px-4 py-2 hover:bg-indigo-500/10 group/btn transition-all duration-300"
                      onClick={() => handleOpenModal(item)}
                    >
                      <span className="text-sm md:text-base text-indigo-400">{t("portfolio.quickView")}</span>
                      <Eye className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 group-hover/btn:scale-110 transition-transform duration-300" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 justify-between px-4 py-2 hover:bg-purple-500/10 group/btn transition-all duration-300"
                      asChild
                    >
                      <a href={`/portfolio/${item.slug}`}>
                        <span className="text-sm md:text-base text-purple-400">{t("portfolio.caseStudy")}</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-purple-400 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button
            size="lg"
            variant="outline"
            className="group border-indigo-500/50 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:border-transparent transition-all duration-500 px-8 py-6 text-base md:text-lg hover:scale-105"
          >
            {t("portfolio.viewAll")}
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal item={selectedItem} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}
