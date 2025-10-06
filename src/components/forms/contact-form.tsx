"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { ContactFormData } from "@/types"

const services = [
  { value: "", label: "Select a service" },
  { value: "web-development", label: "Web Development" },
  { value: "ai-solutions", label: "AI Solutions" },
  { value: "business-planning", label: "Business Planning" },
  { value: "tokenomics", label: "Tokenomics Design" },
  { value: "other", label: "Other" },
]

const budgets = [
  { value: "", label: "Select budget range" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k+", label: "$100,000+" },
]

const timelines = [
  { value: "", label: "Select timeline" },
  { value: "urgent", label: "Urgent (< 1 month)" },
  { value: "1-3", label: "1-3 months" },
  { value: "3-6", label: "3-6 months" },
  { value: "6+", label: "6+ months" },
  { value: "flexible", label: "Flexible" },
]

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@aiplace.com",
    href: "mailto:hello@aiplace.com",
    gradient: "from-indigo-600 to-purple-600"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "https://maps.google.com",
    gradient: "from-pink-600 to-indigo-600"
  },
]

const socialLinks = [
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    gradient: "from-blue-400 to-blue-500"
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    gradient: "from-blue-600 to-blue-700"
  },
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
    gradient: "from-gray-700 to-gray-900"
  },
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
    gradient: "from-blue-500 to-blue-600"
  },
]

export function ContactForm() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const totalSteps = 3

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.service
    }
    if (step === 2) {
      return formData.budget && formData.timeline
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Here you would send the form data to your API
      console.log("Form submitted:", formData)

      // Randomly simulate success/error for demo
      if (Math.random() > 0.8) {
        throw new Error("Failed to send message. Please try again.")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-xl text-gray-300 mb-2">
          We've received your inquiry.
        </p>
        <p className="text-gray-400 mb-8">
          Our team will get back to you within 24 hours.
        </p>
        <Button onClick={() => {
          setIsSubmitted(false)
          setStep(1)
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            service: "",
            projectType: "",
            budget: "",
            timeline: "",
            message: "",
          })
        }}>
          Submit Another Inquiry
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* Left Column: Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-500">Error</p>
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Let's get started
              </h3>
              <p className="text-gray-400">
                Tell us a bit about yourself and your project
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Full Name *
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                  <Input
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="John Doe"
                    required
                    className="relative"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email Address *
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="john@company.com"
                    required
                    className="relative"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="relative"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Company Name
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                  <Input
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    placeholder="Your Company"
                    className="relative"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Which service are you interested in? *
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                <Select
                  options={services}
                  value={formData.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  required
                  className="relative"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Project Details
              </h3>
              <p className="text-gray-400">
                Help us understand your project scope
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Budget Range *
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                <Select
                  options={budgets}
                  value={formData.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                  required
                  className="relative"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Project Timeline *
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                <Select
                  options={timelines}
                  value={formData.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  required
                  className="relative"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Project Type/Description
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                <Input
                  value={formData.projectType}
                  onChange={(e) => updateField("projectType", e.target.value)}
                  placeholder="e.g., E-commerce website, AI chatbot, Business plan"
                  className="relative"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Additional Information */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Almost there!
              </h3>
              <p className="text-gray-400">
                Any additional details you'd like to share?
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Tell us more about your project
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition duration-300" />
                <Textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Share your goals, challenges, or any specific requirements..."
                  rows={6}
                  className="relative"
                />
              </div>
            </div>

            <div className="p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-lg">
              <p className="text-sm text-gray-300">
                By submitting this form, you agree to our privacy policy and
                consent to being contacted about your inquiry.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        {step > 1 && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep(step - 1)}
            className="flex-1 sm:flex-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
        )}

        {step < totalSteps ? (
          <Button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="flex-1 group"
          >
            Next Step
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 group relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </motion.span>
              ) : (
                <motion.span
                  key="submit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  Submit Inquiry
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        )}
      </div>
        </form>
      </div>

      {/* Right Column: Contact Info & Social */}
      <div className="lg:col-span-1 space-y-6">
        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>

          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.label === "Location" ? "_blank" : undefined}
                rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-all group"
              >
                <div className={`p-3 bg-gradient-to-r ${info.gradient} rounded-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>

          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-all group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className={`p-2 bg-gradient-to-r ${social.gradient} rounded-lg relative z-10`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white relative z-10">{social.label}</span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Map or Additional Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
        >
          <h3 className="text-lg font-bold text-white mb-3">Office Hours</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Monday - Friday</span>
              <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Saturday</span>
              <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sunday</span>
              <span className="text-white font-medium">Closed</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-400">
              Response time: Within 24 hours on business days
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
