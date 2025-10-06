"use client"

import React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/hooks"

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle floating background orbs - minimalist */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-brand-pink-200/10 to-brand-purple-200/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-brand-blue-200/10 to-brand-cyan-200/10 blur-3xl animate-float-slower" />
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),rgba(255,255,255,1))] pointer-events-none" />

      {/* Content - Maximum 4 elements */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center">
          {/* HUGE Logo - Dominates the screen */}
          <div className="relative mb-12 sm:mb-16 md:mb-20 animate-fade-in-scale">
            {/* Soft glow effect - premium and subtle */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-400/20 via-brand-purple-400/20 to-brand-blue-400/20 blur-3xl opacity-60 animate-pulse-glow" />

            {/* Massive logo with hover effect */}
            <div className="relative group cursor-default">
              <Image
                src="/images/logo.png"
                alt="AiPlace - Where Creativity Meets AI"
                width={2000}
                height={520}
                priority
                className="relative w-[60vw] sm:w-[55vw] md:w-[50vw] lg:w-[900px] xl:w-[1000px] h-auto object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Short tagline - elegant and concise */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 font-light tracking-wide max-w-2xl mb-10 sm:mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
            {t("hero.description")}
          </p>

          {/* 2 CTA Buttons - premium design */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              className="group h-14 px-8 text-base font-medium bg-gradient-to-r from-brand-pink-600 via-brand-purple-600 to-brand-blue-600 hover:from-brand-pink-700 hover:via-brand-purple-700 hover:to-brand-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {t("hero.getStarted")}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-medium bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-slate-300 hover:border-brand-purple-400 text-slate-700 hover:text-brand-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {t("hero.learnMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
