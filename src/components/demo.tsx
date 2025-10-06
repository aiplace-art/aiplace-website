"use client"

import React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { ServicesGrid } from "@/components/sections/services-grid"
import { PortfolioGrid } from "@/components/sections/portfolio-grid"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel"
import { ContactForm } from "@/components/forms/contact-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Sparkles } from "lucide-react"

export default function ComponentDemo() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Services Grid */}
      <ServicesGrid />

      {/* Portfolio Grid */}
      <PortfolioGrid />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Contact Form Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-950 via-indigo-950/20 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Start Your Project
            </h2>
            <p className="text-xl text-gray-400">
              Tell us about your project and let's create something amazing together
            </p>
          </div>

          <Card className="border-white/10">
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* UI Components Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              UI Components
            </h2>
            <p className="text-xl text-gray-400">
              A comprehensive design system built with Tailwind CSS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Various button styles and sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button size="lg" className="w-full">Primary Large</Button>
                  <Button className="w-full">Primary Default</Button>
                  <Button size="sm" className="w-full">Primary Small</Button>
                </div>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full">Secondary</Button>
                  <Button variant="outline" className="w-full">Outline</Button>
                  <Button variant="ghost" className="w-full">Ghost</Button>
                </div>
              </CardContent>
            </Card>

            {/* Form Elements */}
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Input fields and controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Text input" />
                <Input type="email" placeholder="Email input" />
                <Select
                  options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                  ]}
                />
                <Textarea placeholder="Textarea input" rows={3} />
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Labels and tags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Cards */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Card Components
                </CardTitle>
                <CardDescription>
                  Versatile cards with headers, content, and footers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Cards are the foundation of our design system, providing a
                  consistent container for content with built-in glass morphism
                  effects and gradient borders on hover.
                </p>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Text styles and hierarchy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Heading 1</h1>
                <h2 className="text-2xl font-bold text-white">Heading 2</h2>
                <h3 className="text-xl font-semibold text-white">Heading 3</h3>
                <p className="text-gray-300">Body text paragraph</p>
                <p className="text-sm text-gray-400">Small text</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
