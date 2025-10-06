"use client"

import React, { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { useTranslation } from "@/lib/i18n/hooks"

const navItems = [
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.portfolio", href: "/portfolio" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.contact", href: "/contact" },
]

export function Header() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group transition-all duration-300">
            <Image
              src="/images/logo.png"
              alt={t("common.ariaLabels.logoAlt")}
              width={320}
              height={86}
              className="h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.labelKey}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Right side: Language Switcher + CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("nav.getStarted")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.labelKey}
                href={item.href}
                className="block text-lg font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}

            {/* Language Switcher for Mobile */}
            <div className="pt-4 border-t border-gray-200">
              <LanguageSwitcher />
            </div>

            <Link href="/contact" className="block w-full">
              <Button
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
