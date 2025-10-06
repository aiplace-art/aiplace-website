"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Language, I18nContextType, TranslationKeys } from './types'
import enTranslations from '@/locales/en.json'
import ruTranslations from '@/locales/ru.json'

const translations: Record<Language, TranslationKeys> = {
  en: enTranslations as TranslationKeys,
  ru: ruTranslations as TranslationKeys,
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const STORAGE_KEY = 'aiplace-language'
const DEFAULT_LANGUAGE: Language = 'en'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)
  const [mounted, setMounted] = useState(false)

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language | null
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setLanguageState(savedLanguage)
    }
    setMounted(true)
  }, [])

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }

  // Translation function with nested key support
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        // Fallback to English if translation not found
        console.warn(`Translation key not found: ${key}`)
        let fallback: any = translations.en
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object') {
            fallback = fallback[fk]
          } else {
            return key // Return key itself as last resort
          }
        }
        return fallback as string
      }
    }

    return (value as string) || key
  }

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    translations: translations[language],
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ ...value, language: DEFAULT_LANGUAGE }}>
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18nContext() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18nContext must be used within an I18nProvider')
  }
  return context
}
