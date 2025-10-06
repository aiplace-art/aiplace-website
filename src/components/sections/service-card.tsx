"use client"

import React from "react"
import { ArrowRight, LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
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
  const shouldReduceMotion = useReducedMotion()

  // Scroll-triggered animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
        delay: delay * 0.1,
      },
    },
  }

  // Icon rotation on hover
  const iconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: shouldReduceMotion ? 0 : 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  }

  return (
    <motion.a
      href={href}
      className="block group h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover="hover"
    >
      <motion.div
        className="h-full will-change-transform"
        whileHover={{
          y: shouldReduceMotion ? 0 : -4,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
      >
        <Card className="relative h-full bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:shadow-xl hover:border-gray-300 hover:bg-white/80 transition-all duration-500 overflow-hidden">
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gray-50/30 to-transparent pointer-events-none" />

          <CardHeader className="relative p-10 pb-8 space-y-8">
            {/* Icon - Refined and elegant */}
            <motion.div
              className={`inline-flex w-14 h-14 rounded-xl items-center justify-center ${gradient} shadow-sm group-hover:shadow-md transition-shadow duration-300 will-change-transform`}
              variants={iconVariants}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={2} />
            </motion.div>

            {/* Title and description - Clear hierarchy */}
            <div className="space-y-4">
              <CardTitle className="text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight leading-tight">
                {title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 leading-relaxed font-normal">
                {description}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="relative p-10 pt-0 space-y-8">
            {/* Clean bullet list - scannable */}
            <ul className="space-y-4">
              {offerings.map((offering, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 text-base text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: delay * 0.1 + index * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 flex-shrink-0 group-hover:bg-gray-900 transition-colors duration-300" />
                  <span className="font-normal">{offering}</span>
                </motion.li>
              ))}
            </ul>

            {/* Call-to-action - subtle but clear */}
            <motion.div
              className="pt-2 flex items-center gap-2 text-gray-900 font-medium"
              initial={{ gap: "0.5rem" }}
              whileHover={{
                gap: shouldReduceMotion ? "0.5rem" : "0.75rem",
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
            >
              <span className="text-base">Learn more</span>
              <motion.div
                whileHover={{
                  x: shouldReduceMotion ? 0 : 2,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.a>
  )
}
