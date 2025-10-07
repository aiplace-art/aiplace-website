"use client"

import React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/hooks"

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[70vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-brand-pink-50/30 to-brand-purple-50/40">
      {/* Animated gradient background orbs - Enhanced with 5 orbs, organic motion, and increased intensity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-brand-pink-400/30 to-brand-purple-400/30 blur-[100px] animate-float-organic-1" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-brand-blue-400/35 to-brand-cyan-400/35 blur-[120px] animate-float-organic-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-brand-purple-400/25 to-brand-pink-400/25 blur-[140px] animate-float-organic-3" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-500/30 blur-[110px] animate-float-organic-4" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500/32 via-purple-500/32 to-indigo-500/32 blur-[130px] animate-float-organic-5" />
      </div>

      {/* Gradient mesh overlay - Reduced opacity for more vibrant colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.75),rgba(255,255,255,0.85))] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6 animate-fade-in-up">
          {/* Logo - Enhanced with breathing glow animation and gradient border */}
          <div className="relative mb-8 animate-fade-in-scale group">
            {/* Gradient border container with glass morphism */}
            <div className="relative p-8 md:p-10 lg:p-12 rounded-3xl glass-morphism-strong border-gradient" style={{
              background: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)) padding-box, linear-gradient(135deg, rgba(0, 212, 255, 0.6), rgba(157, 78, 221, 0.6), rgba(255, 0, 110, 0.6)) border-box',
              border: '3px solid transparent'
            }}>
              {/* Enhanced animated glow effects with increased intensity */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-500/50 via-brand-purple-500/50 to-brand-blue-500/50 blur-[80px] opacity-60 animate-pulse-glow rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-400/40 via-brand-cyan-400/40 to-brand-purple-400/40 blur-[60px] animate-pulse rounded-3xl" />

              {/* Main logo - with breathing glow effect (4s cycle) */}
              <Image
                src="/images/logo.png"
                alt="AiPlace - Where Creativity Meets AI"
                width={1000}
                height={260}
                priority
                className="relative w-auto h-32 md:h-44 lg:h-56 object-contain animate-logo-breathe group-hover:scale-105 transition-transform duration-500 z-10"
              />

              {/* Enhanced decorative elements with higher intensity */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-pink-500/30 via-brand-purple-500/30 to-brand-blue-500/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            </div>
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

          {/* CTA Buttons - Enhanced with shimmer and gradient effects */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="group">
              <Button
                size="lg"
                className="h-12 px-6 text-base font-semibold bg-gradient-brand-enhanced hover:bg-gradient-brand-hover text-white rounded-xl shadow-glow-brand-enhanced hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 btn-shimmer"
              >
                {t("hero.getStarted")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="group">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-base font-semibold bg-white/60 backdrop-blur-sm hover:bg-white/90 hover:scale-105 border-2 border-brand-purple-400 text-brand-purple-700 hover:text-brand-purple-900 rounded-xl shadow-lg hover:shadow-glow-brand transition-all duration-300"
              >
                {t("hero.learnMore")}
              </Button>
            </div>
          </div>

          {/* Statistics with enhanced gradient accents, glass morphism, and hover effects */}
          <div className="grid grid-cols-3 gap-6 md:gap-10 pt-10 border-t border-brand-purple-200/40 mt-10 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { value: "150+", labelKey: "hero.stats.projects", gradient: "from-brand-pink-600 to-brand-purple-600" },
              { value: "98%", labelKey: "hero.stats.satisfaction", gradient: "from-brand-purple-600 to-brand-blue-600" },
              { value: "24/7", labelKey: "hero.stats.support", gradient: "from-brand-blue-600 to-brand-cyan-600" },
            ].map((stat) => (
              <div
                key={stat.labelKey}
                className="text-center group cursor-default stat-card rounded-2xl p-5 glass-morphism-strong border border-white/30 hover:border-brand-purple-400/50 transition-all duration-500"
              >
                <div className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent tracking-tight transition-all duration-500 group-hover:scale-110`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-navy-700 mt-3 uppercase tracking-wider font-semibold transition-colors duration-500 group-hover:text-navy-900">
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
