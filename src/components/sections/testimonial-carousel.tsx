"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Testimonial } from "@/types"
import { useTranslation } from "@/lib/i18n/hooks"

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content: "AiPlace transformed our digital presence completely. Their expertise in web development and AI integration helped us increase our conversion rate by 150%. The team is professional, responsive, and truly understands modern business needs.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "DataFlow Systems",
    content: "Working with AiPlace was a game-changer for our AI implementation. They delivered a custom machine learning solution that reduced our processing time by 80%. Their technical knowledge and communication skills are exceptional.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Founder",
    company: "GreenTech Ventures",
    content: "The business planning services from AiPlace were instrumental in securing our Series A funding. Their market analysis and financial projections were thorough and professional. We couldn't have done it without them.",
    rating: 5,
  },
  {
    id: "4",
    name: "David Park",
    role: "Product Manager",
    company: "CryptoWave",
    content: "AiPlace designed our tokenomics from the ground up. Their understanding of Web3 and DeFi is outstanding. The token economy they created is sustainable and has attracted over 10,000 holders in just 3 months.",
    rating: 5,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "EcomGlobal",
    content: "Our new website developed by AiPlace is stunning and performs flawlessly. Page load times are 60% faster, and our bounce rate dropped significantly. The attention to detail and user experience is remarkable.",
    rating: 5,
  },
]

export function TestimonialCarousel() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = testimonials.length - 1
      if (nextIndex >= testimonials.length) nextIndex = 0
      return nextIndex
    })
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 7000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-pink-950/30" />
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("testimonials.description")}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Quote icon */}
          <Quote className="absolute top-0 left-0 w-16 h-16 text-indigo-600/20 -z-10" />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12"
            >
              {/* Rating stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial content */}
              <blockquote className="text-xl sm:text-2xl text-white font-medium mb-8 leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author info */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {currentTestimonial.name.charAt(0)}
                </div>

                <div>
                  <div className="font-semibold text-white text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-400">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => paginate(-1)}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-indigo-600"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="secondary"
              size="icon"
              onClick={() => paginate(1)}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
          {[
            { value: "150+", labelKey: "testimonials.stats.projectsCompleted" },
            { value: "98%", labelKey: "testimonials.stats.clientSatisfaction" },
            { value: "50+", labelKey: "testimonials.stats.activeClients" },
            { value: "5.0", labelKey: "testimonials.stats.averageRating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
