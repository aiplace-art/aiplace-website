"use client"

import React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/hooks"

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-white">
      {/* Simple subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50/30" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center space-y-8">

          {/* Logo - Clean and simple */}
          <div className="mb-4">
            <Image
              src="/images/logo.png"
              alt="AiPlace - Where Creativity Meets AI"
              width={1000}
              height={260}
              priority
              className="w-auto h-40 md:h-52 lg:h-64 object-contain"
            />
          </div>

          {/* Main headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t("hero.title")} {t("hero.titleLine2")}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t("hero.getStarted")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-semibold border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
            >
              {t("hero.learnMore")}
            </Button>
          </div>

          {/* Statistics - Clean and compact */}
          <div className="grid grid-cols-3 gap-8 pt-12 mt-12 border-t border-gray-200 w-full max-w-3xl">
            {[
              { value: "150+", labelKey: "hero.stats.projects" },
              { value: "98%", labelKey: "hero.stats.satisfaction" },
              { value: "24/7", labelKey: "hero.stats.support" },
            ].map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
