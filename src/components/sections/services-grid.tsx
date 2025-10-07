"use client"

import React from "react"
import { Code, Brain, TrendingUp, Coins } from "lucide-react"
import { ServiceCard } from "./service-card"
import { Service } from "@/types"
import { useTranslation } from "@/lib/i18n/hooks"

const servicesConfig = [
  {
    id: "web-dev",
    titleKey: "services.webDev.title",
    descriptionKey: "services.webDev.description",
    icon: Code,
    offerings: [
      "Custom web applications",
      "E-commerce solutions",
      "Performance optimization",
    ],
    slug: "web-development",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    id: "ai",
    titleKey: "services.ai.title",
    descriptionKey: "services.ai.description",
    icon: Brain,
    offerings: [
      "Machine learning models",
      "Natural language processing",
      "Predictive analytics",
    ],
    slug: "ai-solutions",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: "business",
    titleKey: "services.business.title",
    descriptionKey: "services.business.description",
    icon: TrendingUp,
    offerings: [
      "Business model development",
      "Market research",
      "Growth strategy",
    ],
    slug: "business-planning",
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-500",
  },
  {
    id: "tokenomics",
    titleKey: "services.tokenomics.title",
    descriptionKey: "services.tokenomics.description",
    icon: Coins,
    offerings: [
      "Token economy design",
      "Smart contracts",
      "DeFi protocol design",
    ],
    slug: "tokenomics",
    gradient: "bg-gradient-to-br from-pink-500 to-purple-500",
  },
]

export function ServicesGrid() {
  const { t } = useTranslation()

  const services: Service[] = servicesConfig.map(service => ({
    ...service,
    title: t(service.titleKey),
    description: t(service.descriptionKey),
  }))

  return (
    <section className="relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/5 via-transparent to-blue-50/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header - Clean and confident */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            {t("services.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-normal leading-relaxed">
            {t("services.description")}
            <br className="hidden sm:block" />
            {t("services.descriptionLine2")}
          </p>
        </div>

        {/* Professional 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              href={`/services/${service.slug}`}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
