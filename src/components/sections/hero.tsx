"use client"

import React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/hooks"

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[70vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-brand-pink-50/30 to-brand-purple-50/40">
      {/* Animated gradient background orbs - CSS animations for stability */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-brand-pink-400/20 to-brand-purple-400/20 blur-3xl animate-float-slow" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-brand-blue-400/20 to-brand-cyan-400/20 blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-brand-purple-400/15 to-brand-pink-400/15 blur-3xl animate-float" />
      </div>

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),rgba(255,255,255,0.95))] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6 animate-fade-in-up">
          {/* Logo - Large and centered with beautiful effects */}
          <div className="relative mb-8 animate-fade-in-scale group">
            {/* Animated glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-500/40 via-brand-purple-500/40 to-brand-blue-500/40 blur-3xl opacity-50 animate-pulse-glow" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-400/30 via-brand-cyan-400/30 to-brand-purple-400/30 blur-2xl animate-pulse" />

            {/* Main logo - bigger and more prominent */}
            <Image
              src="/images/logo.png"
              alt="AiPlace - Where Creativity Meets AI"
              width={1000}
              height={260}
              priority
              className="relative w-auto h-40 md:h-52 lg:h-64 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
            />

            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-pink-500/20 via-brand-purple-500/20 to-brand-blue-500/20 rounded-3xl blur-xl opacity-60" />
          </div>

          {/* Main headline with gradient text - compact sizing */}
          <div className="space-y-3 max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-brand-pink-600 via-brand-purple-600 to-brand-blue-600 bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-blue-600 via-brand-cyan-600 to-brand-purple-600 bg-clip-text text-transparent">
                {t("hero.titleLine2")}
              </span>
            </h1>

            <p className="text-base md:text-lg text-navy-700 font-normal leading-relaxed max-w-3xl mx-auto px-4">
              {t("hero.description")}
            </p>
          </div>

          {/* CTA Buttons - Compact */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="group">
              <Button
                size="lg"
                className="h-12 px-6 text-base font-semibold bg-gradient-brand hover:bg-gradient-brand-hover text-white rounded-xl shadow-glow-brand hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0"
              >
                {t("hero.getStarted")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-base font-semibold bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:scale-105 border-2 border-brand-purple-300 text-brand-purple-700 hover:text-brand-purple-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("hero.learnMore")}
              </Button>
            </div>
          </div>

          {/* Statistics with gradient accents - perfectly aligned */}
          <div className="grid grid-cols-3 gap-8 md:gap-12 pt-10 border-t border-brand-purple-200/40 mt-10 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { value: "150+", labelKey: "hero.stats.projects", gradient: "from-brand-pink-600 to-brand-purple-600" },
              { value: "98%", labelKey: "hero.stats.satisfaction", gradient: "from-brand-purple-600 to-brand-blue-600" },
              { value: "24/7", labelKey: "hero.stats.support", gradient: "from-brand-blue-600 to-brand-cyan-600" },
            ].map((stat) => (
              <div
                key={stat.labelKey}
                className="text-center group cursor-default hover:scale-105 transition-transform duration-300"
              >
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent tracking-tight`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-navy-600 mt-2 uppercase tracking-wider font-medium">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
            <div className="w-6 h-10 rounded-full border-2 border-brand-purple-400 flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 bg-brand-purple-600 rounded-full animate-scroll-dot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
