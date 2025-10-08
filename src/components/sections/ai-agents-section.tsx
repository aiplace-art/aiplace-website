"use client"

import { useTranslation } from "@/lib/i18n/hooks"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Zap, Users, TrendingUp, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AIAgentsSection() {
  const { t } = useTranslation()

  const agents = [
    {
      icon: Brain,
      titleKey: "aiAgents.agents.ai.title",
      descriptionKey: "aiAgents.agents.ai.description",
      color: "from-purple-500 to-pink-500",
      features: ["aiAgents.agents.ai.features.0", "aiAgents.agents.ai.features.1", "aiAgents.agents.ai.features.2"]
    },
    {
      icon: Users,
      titleKey: "aiAgents.agents.team.title",
      descriptionKey: "aiAgents.agents.team.description",
      color: "from-blue-500 to-cyan-500",
      features: ["aiAgents.agents.team.features.0", "aiAgents.agents.team.features.1", "aiAgents.agents.team.features.2"]
    },
    {
      icon: Zap,
      titleKey: "aiAgents.agents.speed.title",
      descriptionKey: "aiAgents.agents.speed.description",
      color: "from-orange-500 to-red-500",
      features: ["aiAgents.agents.speed.features.0", "aiAgents.agents.speed.features.1", "aiAgents.agents.speed.features.2"]
    },
    {
      icon: TrendingUp,
      titleKey: "aiAgents.agents.scale.title",
      descriptionKey: "aiAgents.agents.scale.description",
      color: "from-green-500 to-emerald-500",
      features: ["aiAgents.agents.scale.features.0", "aiAgents.agents.scale.features.1", "aiAgents.agents.scale.features.2"]
    }
  ]

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {t("aiAgents.badge")}
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {t("aiAgents.title")}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("aiAgents.description")}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { valueKey: "aiAgents.stats.efficiency.value", labelKey: "aiAgents.stats.efficiency.label" },
            { valueKey: "aiAgents.stats.speed.value", labelKey: "aiAgents.stats.speed.label" },
            { valueKey: "aiAgents.stats.quality.value", labelKey: "aiAgents.stats.quality.label" },
            { valueKey: "aiAgents.stats.availability.value", labelKey: "aiAgents.stats.availability.label" }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {t(stat.valueKey)}
              </div>
              <div className="text-sm text-gray-600 h-[2.8rem] line-clamp-2 flex items-center justify-center">
                {t(stat.labelKey)}
              </div>
            </Card>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {agents.map((agent, index) => {
            const Icon = agent.icon
            return (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 h-[3.5rem] line-clamp-2">
                    {t(agent.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 h-[4.5rem] line-clamp-3">
                    {t(agent.descriptionKey)}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-auto">
                    {agent.features.map((featureKey, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-purple-600 mt-1 flex-shrink-0">✓</span>
                        <span className="text-sm">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )
          })}
        </div>

        {/* How It Works */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("aiAgents.howItWorks.title")}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {step}
                  </div>

                  {/* Step title */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3 h-[3rem] line-clamp-2">
                    {t(`aiAgents.howItWorks.steps.${step - 1}.title`)}
                  </h4>

                  {/* Step description */}
                  <p className="text-gray-600 h-[4.5rem] line-clamp-3">
                    {t(`aiAgents.howItWorks.steps.${step - 1}.description`)}
                  </p>
                </div>

                {/* Arrow connector (hidden on last step and mobile) */}
                {step < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-purple-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {t("aiAgents.cta.title")}
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {t("aiAgents.cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white min-w-[180px]"
            >
              <Link href="/#contact">
                {t("aiAgents.cta.startNow")}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-300 hover:bg-purple-50 min-w-[180px]"
            >
              <Link href="/about">
                {t("aiAgents.cta.learnMore")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
