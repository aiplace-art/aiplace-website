"use client"

import { TrendingUp, Users, Award, Headphones } from "lucide-react"
import { useTranslation } from "@/lib/i18n/hooks"

export function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="relative py-12 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/5 to-blue-50/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Centered content */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 md:mb-16 leading-relaxed max-w-3xl mx-auto">
            {t("cta.description")}
          </p>

          {/* Stats Grid - Premium gradient cards with animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
            {[
              {
                value: "150+",
                labelKey: "cta.stats.projectsDelivered",
                icon: TrendingUp,
                gradient: "from-pink-500 to-purple-500",
                shadow: "shadow-pink-500/20",
                textGradient: "from-pink-600 to-purple-600"
              },
              {
                value: "98%",
                labelKey: "cta.stats.clientSatisfaction",
                icon: Award,
                gradient: "from-purple-500 to-blue-500",
                shadow: "shadow-purple-500/20",
                textGradient: "from-purple-600 to-blue-600"
              },
              {
                value: "50+",
                labelKey: "cta.stats.activeClients",
                icon: Users,
                gradient: "from-blue-500 to-cyan-500",
                shadow: "shadow-blue-500/20",
                textGradient: "from-blue-600 to-cyan-600"
              },
              {
                value: "24/7",
                labelKey: "cta.stats.premiumSupport",
                icon: Headphones,
                gradient: "from-cyan-500 to-pink-500",
                shadow: "shadow-cyan-500/20",
                textGradient: "from-cyan-600 to-pink-600"
              },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Gradient glow background */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500`} />

                  {/* Main card */}
                  <div className={`relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 md:p-8 hover:scale-105 hover:-translate-y-1 transition-all duration-500 ${stat.shadow} hover:shadow-xl group-hover:border-white/50`}>
                    {/* Icon with gradient background */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Stat value with gradient text */}
                    <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.textGradient} bg-clip-text text-transparent mb-2 tracking-tight`}>
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-sm md:text-base text-gray-600 font-medium">
                      {t(stat.labelKey)}
                    </div>

                    {/* Animated gradient border on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  </div>
                </div>
              )
            })}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center h-16 px-12 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            {t("cta.getStarted")}
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
