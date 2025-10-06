"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { LanguageSwitcher, LanguageSwitcherCompact } from "@/components/language-switcher"
import { useTranslation } from "@/lib/i18n/hooks"

// Navigation items configuration - using translation keys
const navItemKeys = [
  { key: "nav.services", href: "#services" },
  { key: "nav.portfolio", href: "#portfolio" },
  { key: "nav.about", href: "#about" },
  { key: "nav.blog", href: "#blog" },
  { key: "nav.contact", href: "#contact" },
]

export function Navigation() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effects with useCallback for performance
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    setScrolled(scrollPosition > 50)

    // Update active section based on scroll position
    const sections = navItemKeys.map(item => item.href.replace('#', ''))
    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const { top, bottom } = element.getBoundingClientRect()
        if (top <= 80 && bottom >= 80) { // Account for h-20 header (80px)
          setActiveSection(`#${section}`)
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Smooth scroll to section with useCallback
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.getElementById(href.replace('#', ''))
      if (element) {
        const offset = 80 // Account for h-20 fixed header (80px)
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        })
        setMobileMenuOpen(false)
        setActiveSection(href)
      }
    }
  }, [])

  // Toggle dark mode with useCallback
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  // Mobile menu animation variants - memoized for performance
  const mobileMenuVariants = useMemo(() => ({
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }), [])

  const menuItemVariants = useMemo(() => ({
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }), [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl shadow-lg dark:shadow-navy-950/20 border-b border-gray-200/50 dark:border-navy-800/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/"
              className="flex items-center group transition-all duration-300"
              aria-label={t("common.ariaLabels.home")}
            >
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt={t("common.ariaLabels.logoAlt")}
                  width={180}
                  height={48}
                  className="h-8 md:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                  priority
                />
                {/* Logo glow effect on hover */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 blur-xl bg-gradient-brand transition-opacity duration-500" />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Center */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex items-center gap-8 md:gap-10"
          >
            {navItemKeys.map((item, index) => {
              const isActive = activeSection === item.href
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-sm font-medium text-navy-700 dark:text-navy-100 hover:text-navy-900 dark:hover:text-white transition-colors group"
                >
                  <span className="relative z-10">{t(item.key)}</span>

                  {/* Gradient underline effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />

                </Link>
              )
            })}
          </motion.div>

          {/* Right Section - CTA + Language + Theme Toggle + Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            {/* Language Switcher - Desktop */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Dark Mode Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-navy-800 text-navy-700 dark:text-navy-100 hover:bg-gray-200 dark:hover:bg-navy-700 transition-all duration-300"
                aria-label={t("common.ariaLabels.toggleTheme")}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Link href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="relative overflow-hidden bg-gradient-brand hover:bg-gradient-brand-hover text-white rounded-full px-6 py-2.5 font-semibold shadow-lg hover:shadow-glow-brand transition-all duration-300 min-h-[44px] min-w-[44px]"
                  >
                    <span className="relative z-10">{t("nav.getStarted")}</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-navy-900 dark:text-navy-100 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
              aria-label={t("common.ariaLabels.toggleMenu")}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed top-16 md:top-20 right-0 bottom-0 w-full max-w-sm bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-navy-800/50 shadow-2xl"
          >
            <div className="h-full overflow-y-auto px-6 py-8">
              {/* Mobile Navigation Links */}
              <div className="space-y-2 mb-8">
                {navItemKeys.map((item, index) => {
                  const isActive = activeSection === item.href
                  return (
                    <motion.div
                      key={item.key}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-brand text-white shadow-lg'
                            : 'text-navy-700 dark:text-navy-100 hover:bg-gray-100 dark:hover:bg-navy-800'
                        }`}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Mobile Language Switcher */}
              <motion.div
                custom={navItemKeys.length}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                className="mb-4"
              >
                <LanguageSwitcherCompact />
              </motion.div>

              {/* Mobile CTA Button */}
              <motion.div
                custom={navItemKeys.length}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
              >
                <Link
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="block w-full"
                >
                  <Button
                    className="w-full bg-gradient-brand hover:bg-gradient-brand-hover text-white rounded-full px-6 py-2.5 font-semibold shadow-lg hover:shadow-glow-brand transition-all duration-300 min-h-[44px]"
                  >
                    {t("nav.getStarted")}
                  </Button>
                </Link>
              </motion.div>

              {/* Mobile Menu Footer */}
              <motion.div
                custom={navItemKeys.length + 1}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                className="mt-8 pt-8 border-t border-gray-200 dark:border-navy-800"
              >
                <p className="text-sm text-navy-500 dark:text-navy-400 text-center">
                  {t("common.copyright")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-navy-900/50 backdrop-blur-sm -z-10"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}
