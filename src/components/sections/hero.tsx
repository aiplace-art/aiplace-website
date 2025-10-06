"use client"

import React from "react"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/hooks"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5,
    },
  },
}

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
      duration: 0.8,
    },
  },
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
}

// Floating orbs animation
const orbVariants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

const orbVariants2 = {
  animate: {
    y: [0, 20, 0],
    x: [0, -15, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

const orbVariants3 = {
  animate: {
    y: [0, -15, 0],
    x: [0, 20, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[70vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-brand-pink-50/30 to-brand-purple-50/40">
      {/* Animated gradient background orbs - perfectly symmetrical */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={orbVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-brand-pink-400/20 to-brand-purple-400/20 blur-3xl"
        />
        <motion.div
          variants={orbVariants2}
          animate="animate"
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-brand-blue-400/20 to-brand-cyan-400/20 blur-3xl"
        />
        <motion.div
          variants={orbVariants3}
          animate="animate"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-brand-purple-400/15 to-brand-pink-400/15 blur-3xl"
        />
      </div>

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),rgba(255,255,255,0.95))] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full py-12 md:py-16">
        <motion.div
          className="flex flex-col items-center text-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo - Large and centered with beautiful effects */}
          <motion.div
            className="relative mb-8"
            variants={logoVariants}
            whileHover={{
              scale: 1.03,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
          >
            {/* Animated glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-500/30 via-brand-purple-500/30 to-brand-blue-500/30 blur-3xl opacity-40 animate-pulse-glow" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-400/20 via-brand-cyan-400/20 to-brand-purple-400/20 blur-2xl animate-pulse" />

            {/* Main logo - bigger and more prominent */}
            <Image
              src="/images/logo.png"
              alt="AiPlace - Where Creativity Meets AI"
              width={1000}
              height={260}
              priority
              className="relative w-auto h-40 md:h-52 lg:h-64 object-contain drop-shadow-2xl"
            />

            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-pink-500/10 via-brand-purple-500/10 to-brand-blue-500/10 rounded-3xl blur-xl opacity-50" />
          </motion.div>

          {/* Main headline with gradient text - compact sizing */}
          <motion.div className="space-y-3 max-w-5xl" variants={itemVariants}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-brand-pink-600 via-brand-purple-600 to-brand-blue-600 bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-blue-600 via-brand-cyan-600 to-brand-purple-600 bg-clip-text text-transparent">
                {t("hero.titleLine2")}
              </span>
            </h1>

            <p className="text-base md:text-lg text-navy-700 font-normal leading-relaxed max-w-3xl mx-auto px-4">
              {t("hero.description")}
            </p>
          </motion.div>

          {/* CTA Buttons - Compact */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-2"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="h-12 px-6 text-base font-semibold bg-gradient-brand hover:bg-gradient-brand-hover text-white rounded-xl shadow-glow-brand hover:shadow-2xl transition-all duration-300 group border-0"
              >
                {t("hero.getStarted")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-base font-semibold bg-white/50 backdrop-blur-sm hover:bg-white/80 border-2 border-brand-purple-300 text-brand-purple-700 hover:text-brand-purple-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("hero.learnMore")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Statistics with gradient accents - perfectly aligned */}
          <motion.div
            className="grid grid-cols-3 gap-8 md:gap-12 pt-10 border-t border-brand-purple-200/40 mt-10 w-full max-w-4xl"
            variants={itemVariants}
          >
            {[
              { value: "150+", labelKey: "hero.stats.projects", gradient: "from-brand-pink-600 to-brand-purple-600" },
              { value: "98%", labelKey: "hero.stats.satisfaction", gradient: "from-brand-purple-600 to-brand-blue-600" },
              { value: "24/7", labelKey: "hero.stats.support", gradient: "from-brand-blue-600 to-brand-cyan-600" },
            ].map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                className="text-center group cursor-default"
                variants={statVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent tracking-tight`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-navy-600 mt-2 uppercase tracking-wider font-medium">
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            variants={itemVariants}
            animate={{
              y: [0, 8, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-brand-purple-400 flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 bg-brand-purple-600 rounded-full"
                animate={{
                  y: [0, 12, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
