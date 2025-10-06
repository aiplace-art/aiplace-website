"use client"

import React from "react"
import { motion } from "framer-motion"
import { Search, Map, Palette, Rocket, HeartHandshake } from "lucide-react"
import { ProcessStep } from "@/types"

const processSteps: ProcessStep[] = [
  {
    id: "1",
    title: "Discovery & Analysis",
    description: "We dive deep into understanding your business, goals, and challenges to create a solid foundation for success.",
    icon: Search,
  },
  {
    id: "2",
    title: "Strategy & Planning",
    description: "Our team develops a comprehensive roadmap tailored to your needs, ensuring every step aligns with your objectives.",
    icon: Map,
  },
  {
    id: "3",
    title: "Design & Development",
    description: "We bring your vision to life with cutting-edge technology and stunning design, creating solutions that stand out.",
    icon: Palette,
  },
  {
    id: "4",
    title: "Testing & Launch",
    description: "Rigorous quality assurance and testing ensure your product is flawless before we launch it to the world.",
    icon: Rocket,
  },
  {
    id: "5",
    title: "Support & Growth",
    description: "Our partnership doesn't end at launch. We provide ongoing support and optimization to help you grow.",
    icon: HeartHandshake,
  },
]

export function ProcessTimeline() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-indigo-950/20 to-gray-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A proven methodology that delivers results every time
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600" />

          {/* Steps */}
          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0
              const Icon = step.icon

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                    isEven ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`space-y-4 ${
                      isEven ? "lg:text-right" : "lg:col-start-2"
                    }`}
                  >
                    <div className="inline-flex items-center gap-3 text-indigo-400 font-semibold">
                      <span className="text-sm">STEP {index + 1}</span>
                      <div className="h-px w-12 bg-indigo-400" />
                    </div>

                    <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                    <p className="text-lg text-gray-300 max-w-md">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div
                    className={`hidden lg:flex items-center justify-center ${
                      isEven ? "lg:col-start-2" : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-50" />

                      {/* Icon container */}
                      <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                        <Icon className="w-12 h-12 text-white" />
                      </div>

                      {/* Number badge */}
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-indigo-600 shadow-lg">
                        {index + 1}
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile icon */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center font-bold text-indigo-600 text-sm">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full border-4 border-gray-950 z-10" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
