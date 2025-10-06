"use client"

import React from 'react'
import { useTranslation } from '@/lib/i18n'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200/50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
      aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
      title={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
    >
      {/* Icon */}
      <Languages className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />

      {/* Language Flags and Text */}
      <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
        {language === 'en' ? (
          <>
            <span className="text-base leading-none" role="img" aria-label="English">🇬🇧</span>
            <span>EN</span>
          </>
        ) : (
          <>
            <span className="text-base leading-none" role="img" aria-label="Russian">🇷🇺</span>
            <span>RU</span>
          </>
        )}
      </span>

      {/* Hover indicator */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </button>
  )
}
