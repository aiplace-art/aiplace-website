"use client"

import React, { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleLanguage = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setLanguage(language === 'en' ? 'ru' : 'en')
      setTimeout(() => setIsAnimating(false), 300)
    }, 150)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-blue-500/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
      aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
      title={`Switch to ${language === 'en' ? 'Русский' : 'English'}`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative flex items-center gap-3 px-5 py-2.5">
        {/* Globe icon with rotation animation */}
        <div className={`transition-transform duration-500 ${isAnimating ? 'rotate-180 scale-110' : 'rotate-0'}`}>
          <Globe className="w-5 h-5 text-purple-600 group-hover:text-purple-500 transition-colors" />
        </div>

        {/* Language display with flip animation */}
        <div className="flex items-center gap-2 min-w-[60px]">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
            {language === 'en' ? (
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none" role="img" aria-label="English">🇬🇧</span>
                <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">EN</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none" role="img" aria-label="Russian">🇷🇺</span>
                <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">RU</span>
              </div>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-purple-600/60 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>

      {/* Pulse effect on click */}
      {isAnimating && (
        <div className="absolute inset-0 animate-ping bg-purple-400/30 rounded-2xl" />
      )}
    </button>
  )
}
