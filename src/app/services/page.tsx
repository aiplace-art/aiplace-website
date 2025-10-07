'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Code, Brain, LineChart, Coins, MessageSquare, Phone, Puzzle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/hooks'

export default function ServicesPage() {
  const { t } = useTranslation()

  const services = [
    {
      id: 'landingPages',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      href: '/services/landing-pages'
    },
    {
      id: 'webPlatforms',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      href: '/services/web-platforms'
    },
    {
      id: 'websiteCloning',
      icon: Puzzle,
      color: 'from-green-500 to-emerald-500',
      href: '/services/website-cloning'
    },
    {
      id: 'telegramBots',
      icon: MessageSquare,
      color: 'from-indigo-500 to-blue-500',
      href: '/services/telegram-bots'
    },
    {
      id: 'voiceAssistants',
      icon: Phone,
      color: 'from-orange-500 to-red-500',
      href: '/services/voice-assistants'
    },
    {
      id: 'aiWidgets',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      href: '/services/ai-widgets'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_50%)]" />

        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
              {t("services.title")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              {t("services.description")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("services.descriptionLine2")}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.id}
                  className="bg-gradient-to-br from-white/10 to-white/5 border-white/10 backdrop-blur-sm p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group h-full"
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {t(`services.${service.id}.title`)}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-purple-400 text-sm mb-4">
                      {t(`services.${service.id}.subtitle`)}
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 flex-grow">
                      {t(`services.${service.id}.description`)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {[0, 1, 2].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span>{t(`services.${service.id}.features.${i}`)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
                    >
                      <Link href={service.href}>
                        {t("services.learnMore")}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Summary Section */}
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center tracking-tight">
              {t("services.summary.title")}
            </h2>
            <ul className="space-y-6 max-w-3xl mx-auto">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-200">
                  <span className="text-2xl">🚀</span>
                  <span className="text-lg">{t(`services.summary.items.${i}`)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
            {t("contact.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("contact.description")}
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Link href="/#contact">
              {t("hero.getStarted")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
