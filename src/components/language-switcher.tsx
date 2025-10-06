"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en")
  }

  if (!mounted) {
    return (
      <div className="w-[72px] h-10 rounded-lg bg-gray-100 dark:bg-navy-800 animate-pulse" />
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="relative flex items-center gap-2 p-2 px-3 rounded-lg bg-gray-100 dark:bg-navy-800 hover:bg-gray-200 dark:hover:bg-navy-700 transition-all duration-300 group overflow-hidden min-h-[44px] min-w-[44px]"
      aria-label={`${t("common.switchLanguage")} ${language === "en" ? "Russian" : "English"}`}
    >
      {/* Gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Language display with flag emoji and code */}
      <div className="relative flex items-center gap-1.5">
        <AnimatePresence mode="wait">
          {language === "en" ? (
            <motion.div
              key="en"
              initial={{ opacity: 0, y: -10, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 10, rotateX: 90 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1.5"
            >
              <span className="text-lg leading-none">🇬🇧</span>
              <span className="text-sm font-semibold text-navy-700 dark:text-navy-100">
                EN
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="ru"
              initial={{ opacity: 0, y: -10, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 10, rotateX: 90 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1.5"
            >
              <span className="text-lg leading-none">🇷🇺</span>
              <span className="text-sm font-semibold text-navy-700 dark:text-navy-100">
                RU
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle divider */}
        <motion.div
          className="w-px h-4 bg-gray-300 dark:bg-navy-600 mx-0.5"
          animate={{ scaleY: [1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Toggle indicator */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-gradient-brand"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-navy-900 dark:bg-navy-100 text-white dark:text-navy-900 text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {language === "en" ? `${t("common.switchLanguage")} Russian` : `${t("common.switchLanguage")} English`}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-navy-900 dark:bg-navy-100 rotate-45" />
      </motion.div>
    </motion.button>
  )
}

// Compact version for mobile menu
export function LanguageSwitcherCompact() {
  const { language, setLanguage } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en")
  }

  if (!mounted) {
    return (
      <div className="w-full h-12 rounded-xl bg-gray-100 dark:bg-navy-800 animate-pulse" />
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleLanguage}
      className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium rounded-xl bg-gray-100 dark:bg-navy-800 hover:bg-gradient-brand hover:text-white transition-all duration-300 group"
      aria-label={`${t("common.switchLanguage")} ${language === "en" ? "Russian" : "English"}`}
    >
      <span className="flex items-center gap-3">
        <AnimatePresence mode="wait">
          {language === "en" ? (
            <motion.span
              key="en-flag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
            >
              🇬🇧
            </motion.span>
          ) : (
            <motion.span
              key="ru-flag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
            >
              🇷🇺
            </motion.span>
          )}
        </AnimatePresence>
        <span className="text-navy-700 dark:text-navy-100 group-hover:text-white">
          {language === "en" ? "English" : "Русский"}
        </span>
      </span>

      <motion.span
        className="text-sm text-navy-500 dark:text-navy-400 group-hover:text-white/80"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {language === "en" ? `${t("common.switchLanguage")} RU` : `${t("common.switchLanguage")} EN`}
      </motion.span>
    </motion.button>
  )
}
