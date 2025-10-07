"use client"

import React, { useState, useEffect } from "react"
import { ArrowRight, LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  offerings: string[]
  gradient: string
  href?: string
  delay?: number
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  offerings,
  gradient,
  href = "#",
  delay = 0,
}: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href={href}
      className={`block group h-full service-card ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ animationDelay: `${delay * 150}ms` }}
    >
      <Card className="relative h-full bg-white/70 backdrop-blur-md glass-morphism-strong border border-gray-200/60 rounded-3xl service-card-tilt overflow-hidden transition-all duration-600">
        {/* Gradient overlay that appears on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-gray-50/50 via-purple-50/30 to-blue-50/50 pointer-events-none rounded-3xl" />

        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-gradient" style={{
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(0, 212, 255, 0.4), rgba(157, 78, 221, 0.4), rgba(255, 0, 110, 0.4)) border-box',
          border: '2px solid transparent'
        }} />

        <CardHeader className="relative p-10 pb-8 space-y-8 z-10">
          {/* Icon with enhanced bounce and glow on hover */}
          <div className={`inline-flex w-16 h-16 rounded-2xl items-center justify-center ${gradient} shadow-lg group-hover:shadow-2xl transition-all duration-500 service-icon-bounce`}>
            <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>

          {/* Title and description with gradient underline effect */}
          <div className="space-y-4">
            <CardTitle className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight gradient-underline">
              {title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 leading-relaxed font-normal">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="relative p-10 pt-0 space-y-8 z-10">
          {/* Enhanced bullet list with staggered fade-in */}
          <ul className="space-y-4">
            {offerings.map((offering, index) => (
              <li
                key={index}
                className="flex items-start gap-4 text-base text-gray-700 leading-relaxed opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(delay * 150) + (index * 100)}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-medium">{offering}</span>
              </li>
            ))}
          </ul>

          {/* Enhanced CTA with arrow animation */}
          <div className="pt-2 flex items-center gap-3 text-gray-900 font-semibold group-hover:gap-4 transition-all duration-300">
            <span className="text-base bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Learn more
            </span>
            <div className="transform group-hover:translate-x-2 transition-transform duration-300">
              <ArrowRight className="w-5 h-5 text-purple-600" strokeWidth={2.5} />
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
