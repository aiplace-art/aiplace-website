"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Code2,
  Smartphone,
  ShoppingCart,
  Zap,
  Database,
  CheckCircle,
  Award,
  Clock,
  TrendingUp,
  Users,
  Star,
  MessageSquare,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function WebDevelopmentPage() {
  return (
    <main className="relative bg-gray-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Key Features */}
      <KeyFeaturesSection />

      {/* Technologies Section */}
      <TechnologiesSection />

      {/* Process Breakdown */}
      <ProcessSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Case Studies */}
      <CaseStudiesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Badge */}
          <Badge variant="secondary" className="text-sm">
            <Code2 className="w-4 h-4 mr-2" />
            Modern Web Development
          </Badge>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
            Custom Web Development
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              That Drives Results
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Modern, scalable web applications built with Next.js, TypeScript, and cutting-edge technologies.
            Transform your digital presence with websites that are fast, beautiful, and conversion-focused.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline">
              View Portfolio
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
            {[
              { icon: Zap, value: "90+", label: "Lighthouse Score" },
              { icon: TrendingUp, value: "150%", label: "Avg. Speed Increase" },
              { icon: Users, value: "100+", label: "Sites Launched" },
              { icon: Award, value: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Key Features Section
function KeyFeaturesSection() {
  const features = [
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach ensuring flawless experiences across all devices. Your site will look stunning on smartphones, tablets, and desktops.",
      benefits: ["Cross-device compatibility", "Touch-optimized interfaces", "Adaptive layouts", "50% mobile conversion increase"],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Custom shopping experiences with secure payment integration, inventory management, and streamlined checkout processes.",
      benefits: ["Stripe & PayPal integration", "Real-time inventory", "One-click checkout", "PCI compliance"],
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: Smartphone,
      title: "Progressive Web Apps",
      description: "App-like experiences that work offline, load instantly, and can be installed on user devices without app stores.",
      benefits: ["Offline functionality", "Push notifications", "Home screen install", "Native app feel"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast load times optimized for Core Web Vitals, SEO, and user experience with 90+ Lighthouse scores guaranteed.",
      benefits: ["< 2s load times", "SEO optimization", "Image optimization", "Code splitting"],
      gradient: "from-yellow-600 to-orange-600"
    },
    {
      icon: Database,
      title: "Custom CMS Integration",
      description: "Headless CMS solutions with Sanity.io for flexible content management, multi-channel publishing, and easy updates.",
      benefits: ["Headless architecture", "Real-time collaboration", "Version control", "Multi-channel publishing"],
      gradient: "from-indigo-600 to-blue-600"
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gray-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Service <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive web development services tailored to your business needs
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:border-white/20 transition-all">
                  <CardHeader>
                    <div className="relative mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                      <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Technologies Section
function TechnologiesSection() {
  const technologies = [
    { name: "Next.js 14", category: "Framework", description: "Server-side rendering, static generation, and optimal performance" },
    { name: "TypeScript", category: "Language", description: "Type-safe code with better developer experience and fewer bugs" },
    { name: "Tailwind CSS", category: "Styling", description: "Utility-first CSS for rapid, maintainable styling" },
    { name: "Framer Motion", category: "Animation", description: "Smooth, professional animations and transitions" },
    { name: "Sanity.io", category: "CMS", description: "Headless CMS for flexible content management" },
    { name: "Vercel", category: "Hosting", description: "Edge network deployment for global performance" },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technology <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We use industry-leading technologies to build fast, scalable, and maintainable web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:border-blue-500/50 transition-all">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{tech.category}</Badge>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{tech.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Process Section
function ProcessSection() {
  const phases = [
    {
      phase: "01",
      title: "Discovery & Analysis",
      duration: "1-2 weeks",
      description: "We dive deep into your requirements, analyze competitors, and create a detailed project roadmap.",
      deliverables: ["Requirements documentation", "Competitor analysis", "Technical feasibility study", "Project timeline"]
    },
    {
      phase: "02",
      title: "Strategy & Planning",
      duration: "1 week",
      description: "Information architecture, wireframing, and technology stack selection aligned with your goals.",
      deliverables: ["Site map & IA", "Wireframes", "Tech stack plan", "Design system foundation"]
    },
    {
      phase: "03",
      title: "Design & Development",
      duration: "3-4 weeks",
      description: "Beautiful UI/UX design followed by robust frontend and backend development with quality assurance.",
      deliverables: ["UI/UX designs", "Responsive frontend", "Backend integration", "QA testing"]
    },
    {
      phase: "04",
      title: "Testing & Launch",
      duration: "1 week",
      description: "Comprehensive testing across devices, browsers, and performance metrics before going live.",
      deliverables: ["Cross-browser testing", "Performance optimization", "Security audit", "Production deployment"]
    },
    {
      phase: "05",
      title: "Support & Growth",
      duration: "Ongoing",
      description: "Continuous monitoring, updates, and optimization to ensure your site performs at its best.",
      deliverables: ["24/7 monitoring", "Regular updates", "Analytics tracking", "Performance optimization"]
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Development <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our proven 5-phase process ensures successful project delivery every time
          </p>
        </motion.div>

        <div className="space-y-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:border-blue-500/50 transition-all">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{phase.phase}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {phase.title}
                        </h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {phase.duration}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-4">{phase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((item, i) => (
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  const tiers = [
    {
      name: "Starter",
      price: "$5,000 - $15,000",
      description: "Perfect for small businesses and startups looking to establish their online presence",
      features: [
        "Up to 10 pages",
        "Responsive design",
        "Basic SEO optimization",
        "Contact form integration",
        "3 months support",
        "CMS integration",
      ],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      name: "Professional",
      price: "$15,000 - $40,000",
      description: "For growing businesses needing advanced features and custom functionality",
      features: [
        "Up to 25 pages",
        "Custom UI/UX design",
        "Advanced SEO",
        "E-commerce integration",
        "6 months support",
        "Custom CMS",
        "Performance optimization",
        "Analytics setup",
      ],
      gradient: "from-indigo-600 to-purple-600",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$40,000+",
      description: "Comprehensive solutions for large organizations with complex requirements",
      features: [
        "Unlimited pages",
        "Enterprise-grade security",
        "Custom integrations",
        "Multi-language support",
        "12 months support",
        "Dedicated project manager",
        "Priority support",
        "Custom analytics",
        "Performance SLA",
      ],
      gradient: "from-purple-600 to-pink-600"
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Flexible packages designed to fit your budget and requirements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={tier.popular ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card className={`h-full relative ${tier.popular ? "border-blue-500/50" : ""}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent mb-4`}>
                    {tier.price}
                  </div>
                  <p className="text-gray-400 mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${tier.popular ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : ""}`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Need a custom solution?</p>
          <Button variant="outline" size="lg">
            Request Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// Case Studies Section
function CaseStudiesSection() {
  const caseStudies = [
    {
      title: "E-Commerce Platform Redesign",
      client: "TechRetail Co.",
      industry: "Retail",
      challenge: "Outdated platform with 8-second load times and 60% mobile cart abandonment",
      solution: "Complete Next.js rebuild with optimized checkout flow and PWA capabilities",
      results: [
        { metric: "Load Time", before: "8.2s", after: "1.2s", improvement: "-85%" },
        { metric: "Mobile Conversions", before: "1.8%", after: "4.5%", improvement: "+150%" },
        { metric: "Revenue", before: "$2.1M", after: "$3.9M", improvement: "+86%" },
      ],
      technologies: ["Next.js 14", "TypeScript", "Stripe", "Vercel"],
      testimonial: "The new platform exceeded our expectations. Load times are blazing fast and our mobile conversions tripled.",
      author: "Sarah Chen, CTO at TechRetail"
    },
    {
      title: "Healthcare Portal Development",
      client: "MediConnect",
      industry: "Healthcare",
      challenge: "Need for HIPAA-compliant patient portal with real-time appointment booking",
      solution: "Custom-built portal with end-to-end encryption and real-time features",
      results: [
        { metric: "Patient Adoption", before: "0%", after: "78%", improvement: "+78%" },
        { metric: "Admin Time Saved", before: "0h", after: "120h/week", improvement: "120h" },
        { metric: "Patient Satisfaction", before: "3.2/5", after: "4.8/5", improvement: "+50%" },
      ],
      technologies: ["Next.js", "PostgreSQL", "AWS", "Twilio"],
      testimonial: "Our patients love the portal. It's transformed how we deliver care and manage appointments.",
      author: "Dr. Michael Roberts, Medical Director"
    },
    {
      title: "SaaS Platform Launch",
      client: "DataFlow Analytics",
      industry: "SaaS",
      challenge: "Launch B2B analytics platform with complex data visualizations and real-time updates",
      solution: "High-performance React dashboard with WebSocket integration and advanced charting",
      results: [
        { metric: "Beta Users", before: "0", after: "500", improvement: "500" },
        { metric: "Data Processing", before: "N/A", after: "1M rows/sec", improvement: "1M" },
        { metric: "Uptime", before: "N/A", after: "99.9%", improvement: "99.9%" },
      ],
      technologies: ["Next.js", "D3.js", "WebSocket", "Redis"],
      testimonial: "They built exactly what we envisioned. The platform is fast, scalable, and our users love it.",
      author: "James Wilson, Founder & CEO"
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real results from real projects. See how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Left Column */}
                    <div className="p-8 bg-gradient-to-br from-blue-950/50 to-purple-950/50">
                      <Badge variant="secondary" className="mb-4">{study.industry}</Badge>
                      <h3 className="text-3xl font-bold text-white mb-2">{study.title}</h3>
                      <p className="text-blue-400 mb-6">{study.client}</p>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">Challenge</h4>
                          <p className="text-gray-300">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">Solution</h4>
                          <p className="text-gray-300">{study.solution}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <MessageSquare className="w-6 h-6 text-blue-400 mb-2" />
                        <p className="text-gray-300 italic mb-2">"{study.testimonial}"</p>
                        <p className="text-sm text-gray-400">{study.author}</p>
                      </div>
                    </div>

                    {/* Right Column - Metrics */}
                    <div className="p-8">
                      <h4 className="text-xl font-bold text-white mb-6">Key Results</h4>
                      <div className="space-y-6">
                        {study.results.map((result, i) => (
                          <div key={i} className="border-b border-white/10 pb-6 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400">{result.metric}</span>
                              <Badge className="bg-green-600">{result.improvement}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Before</div>
                                <div className="text-lg font-semibold text-gray-400">{result.before}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-1">After</div>
                                <div className="text-lg font-semibold text-green-400">{result.after}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "Timeline varies based on complexity. A simple website takes 4-6 weeks, while complex applications can take 12-16 weeks. We provide detailed timelines during the discovery phase and keep you updated throughout the process."
    },
    {
      question: "What's included in your web development service?",
      answer: "Our comprehensive service includes UI/UX design, responsive development, CMS integration, SEO optimization, performance tuning, security implementation, testing, deployment, and post-launch support. Every project is tailored to your specific needs."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes! All packages include post-launch support (3-12 months depending on the tier). This covers bug fixes, security updates, performance monitoring, and minor content updates. We also offer extended maintenance contracts for long-term partnerships."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Absolutely! We specialize in website redesigns and modernization. We'll analyze your current site, preserve what works, and rebuild with modern technologies while improving performance, user experience, and conversions."
    },
    {
      question: "What technologies do you use and why?",
      answer: "We use Next.js 14, TypeScript, Tailwind CSS, and modern tools for several reasons: superior performance, better SEO, improved developer experience, easier maintenance, and future-proof architecture. These choices ensure your website stays competitive for years."
    },
    {
      question: "How do you ensure website security?",
      answer: "We implement multiple security layers: HTTPS encryption, secure authentication, input validation, SQL injection prevention, XSS protection, CSRF tokens, regular security audits, and compliance with industry standards (OWASP, PCI-DSS where applicable)."
    },
    {
      question: "Will my website be mobile-friendly?",
      answer: "Yes, absolutely! All our websites are built mobile-first, ensuring perfect experiences on smartphones, tablets, and desktops. We test across multiple devices and screen sizes to guarantee responsive, touch-optimized interfaces."
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about our web development services
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group hover:border-blue-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <Button variant="outline" size="lg">
            Contact Our Team
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Ready to Build Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Next-Generation Website?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get a free consultation and project estimate. Let's discuss how we can transform your digital presence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Calendar className="w-5 h-5" />
              Book Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" className="border-white/20 hover:bg-white/10">
              View Portfolio
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free project estimate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Response in 24 hours</span>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400">4.9/5 from 100+ clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
