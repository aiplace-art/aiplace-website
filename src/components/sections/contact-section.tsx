"use client"

import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n/hooks"

export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="relative py-12 md:py-16 scroll-mt-24 bg-gradient-to-b from-gray-950 via-gray-100 to-white">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/5 via-blue-50/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Centered content with max-width for readability */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
            {t("contact.description")}
            <br className="hidden sm:block" />
            {t("contact.descriptionLine2")}
          </p>
        </div>

        {/* Contact CTA - Using 8px grid spacing */}
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-6 md:p-10 lg:p-12 text-center shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("contact.ctaTitle")}
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("contact.ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {t("contact.contactUs")}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:hello@aiplace.com"
              className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t("contact.emailUs")}
            </a>
          </div>
          <p className="text-sm text-gray-500">
            {t("contact.callUs")} <a href="tel:+15551234567" className="text-gray-900 font-semibold hover:underline">+1 (555) 123-4567</a>
          </p>
        </div>
      </div>
    </section>
  )
}
