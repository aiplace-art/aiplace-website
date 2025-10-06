"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, ArrowRight, Check } from "lucide-react"
import { PortfolioItem } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PortfolioModalProps {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}

export function PortfolioModal({ item, isOpen, onClose }: PortfolioModalProps) {
  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Hero Image with 16:9 aspect ratio */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2 text-base">
                      {item.category}
                    </Badge>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
                    >
                      {item.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-base md:text-lg text-gray-200"
                    >
                      {item.client}
                    </motion.p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 space-y-8">
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                      Project Overview
                    </h3>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20 transition-colors px-4 py-2 text-sm md:text-base"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>

                  {/* Results */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
                      Key Results
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {item.results.map((result, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="p-5 md:p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-indigo-500/20">
                              <Check className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                              <div className="text-2xl md:text-3xl font-bold text-indigo-400 mb-2">
                                {result.value}
                              </div>
                              <div className="text-sm md:text-base text-gray-400">
                                {result.metric}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-wrap gap-4 pt-6"
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 group px-6 py-6 text-base md:text-lg"
                      asChild
                    >
                      <a href={`/portfolio/${item.slug}`}>
                        View Full Case Study
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 hover:bg-white/5 group px-6 py-6 text-base md:text-lg"
                    >
                      Live Project
                      <ExternalLink className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
