"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  FileText,
  CheckCircle,
  Award,
  Clock,
  Briefcase,
  PieChart,
  LineChart,
  Calendar,
  Star,
  MessageSquare,
  Lightbulb
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BusinessPlanningPage() {
  return (
    <main className="relative bg-gray-950">
      <HeroSection />
      <KeyFeaturesSection />
      <MethodologySection />
      <ProcessSection />
      <PricingSection />
      <CaseStudiesSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-950 to-teal-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <Badge variant="secondary" className="text-sm">
            <Briefcase className="w-4 h-4 mr-2" />
            Strategic Business Planning
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
            Strategic Business Planning
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              for Sustainable Growth
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Data-driven business plans, market analysis, and go-to-market strategies that attract investors
            and drive results. From idea validation to funding success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" className="group">
              Get Your Business Plan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline">
              Schedule Consultation
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
            {[
              { icon: DollarSign, value: "$50M+", label: "Raised by Clients" },
              { icon: TrendingUp, value: "90%", label: "Funding Success" },
              { icon: Users, value: "200+", label: "Plans Created" },
              { icon: Award, value: "4.9/5", label: "Client Rating" },
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
                  <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
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

function KeyFeaturesSection() {
  const features = [
    {
      icon: Target,
      title: "Business Model Development",
      description: "Design robust business models using proven frameworks like Business Model Canvas, focusing on value creation and competitive advantage.",
      benefits: ["Canvas methodology", "Revenue stream design", "Value proposition refinement", "Scalability planning"],
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      icon: PieChart,
      title: "Market Analysis",
      description: "Comprehensive industry research and competitor analysis to identify opportunities and validate your market positioning.",
      benefits: ["Industry research", "Competitor analysis", "Target market identification", "TAM/SAM/SOM sizing"],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: DollarSign,
      title: "Financial Projections",
      description: "Detailed 3-5 year financial forecasts with realistic assumptions, scenario planning, and investor-grade models.",
      benefits: ["3-5 year forecasts", "Cash flow modeling", "Break-even analysis", "Unit economics"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: TrendingUp,
      title: "Go-to-Market Strategy",
      description: "Comprehensive GTM plans including channel strategy, pricing, customer acquisition, and partnership roadmaps.",
      benefits: ["Channel strategy", "Pricing strategy", "CAC optimization", "Launch roadmap"],
      gradient: "from-orange-600 to-yellow-600"
    },
    {
      icon: FileText,
      title: "Investor Pitch Decks",
      description: "Compelling investor presentations with data visualization, clear narratives, and professional design that wins funding.",
      benefits: ["Compelling narratives", "Data visualization", "Professional design", "Pitch coaching"],
      gradient: "from-indigo-600 to-purple-600"
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gray-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Service <span className="gradient-text">Offerings</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive business planning services to take you from idea to execution
          </p>
        </motion.div>

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
                    <CardTitle className="text-2xl group-hover:text-emerald-400 transition-colors">
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

function MethodologySection() {
  const methodologies = [
    { name: "Business Model Canvas", description: "Proven framework for designing and validating business models" },
    { name: "Lean Startup", description: "Build-measure-learn cycles for rapid validation" },
    { name: "Porter's Five Forces", description: "Competitive analysis and industry dynamics" },
    { name: "SWOT Analysis", description: "Strategic assessment of strengths and opportunities" },
    { name: "OKR Framework", description: "Objectives and Key Results for goal setting" },
    { name: "Financial Modeling", description: "Industry-standard forecasting and valuation" },
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
            Our <span className="gradient-text">Methodology</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We use industry-proven frameworks and best practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodologies.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:border-emerald-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{method.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const phases = [
    {
      phase: "01",
      title: "Discovery & Research",
      duration: "1 week",
      description: "Deep dive into your business concept, competitive landscape, and market opportunities.",
      deliverables: ["Stakeholder interviews", "Market research", "Competitor analysis", "SWOT assessment"]
    },
    {
      phase: "02",
      title: "Strategy Development",
      duration: "2 weeks",
      description: "Craft your business model, value proposition, and strategic positioning in the market.",
      deliverables: ["Business model canvas", "Value proposition", "Strategic positioning", "Revenue model"]
    },
    {
      phase: "03",
      title: "Financial Modeling",
      duration: "2 weeks",
      description: "Build comprehensive financial projections with realistic assumptions and scenario planning.",
      deliverables: ["P&L projections", "Cash flow model", "Balance sheet", "Unit economics"]
    },
    {
      phase: "04",
      title: "Plan & Deck Creation",
      duration: "1-2 weeks",
      description: "Create investor-ready business plan and pitch deck with compelling narratives and visuals.",
      deliverables: ["Business plan (30-50 pages)", "Executive summary", "Pitch deck (15-20 slides)", "Financial appendix"]
    },
    {
      phase: "05",
      title: "Refinement & Coaching",
      duration: "1 week",
      description: "Review, refine, and prepare you to present your plan confidently to investors.",
      deliverables: ["Plan refinement", "Pitch practice", "Q&A preparation", "Investor list"]
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
            Planning <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our structured approach to creating investor-ready business plans
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
              <Card className="group hover:border-emerald-500/50 transition-all">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{phase.phase}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
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
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/30">
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

function PricingSection() {
  const tiers = [
    {
      name: "Startup Essentials",
      price: "$5,000 - $10,000",
      description: "Perfect for early-stage startups validating their business model",
      features: [
        "Business model canvas",
        "Executive summary (5 pages)",
        "Basic financial projections",
        "Pitch deck (10 slides)",
        "1 revision round",
        "Email support",
      ],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      name: "Growth Package",
      price: "$10,000 - $25,000",
      description: "Comprehensive planning for companies seeking Series A/B funding",
      features: [
        "Full business plan (30-40 pages)",
        "Detailed market analysis",
        "3-year financial model",
        "Investor pitch deck (15-20 slides)",
        "Go-to-market strategy",
        "3 revision rounds",
        "Pitch coaching session",
        "Priority support",
      ],
      gradient: "from-emerald-600 to-teal-600",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$25,000+",
      description: "Premium service for established companies and complex projects",
      features: [
        "Comprehensive business plan (50+ pages)",
        "In-depth market research",
        "5-year financial projections",
        "Multiple pitch deck versions",
        "Competitive analysis",
        "Investor introduction support",
        "Unlimited revisions",
        "Dedicated strategist",
        "Board presentation support",
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
            Investment in Your <span className="gradient-text">Success</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transparent pricing for professional business planning services
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
              <Card className={`h-full relative ${tier.popular ? "border-emerald-500/50" : ""}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600">
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
                    className={`w-full ${tier.popular ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" : ""}`}
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
          <p className="text-gray-400 mb-4">Need à la carte services?</p>
          <Button variant="outline" size="lg">
            View Service Options
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function CaseStudiesSection() {
  const caseStudies = [
    {
      title: "SaaS Startup Funding Success",
      client: "DataFlow Analytics",
      industry: "SaaS / B2B Software",
      challenge: "First-time founder needed investor-ready business plan and pitch deck for seed funding",
      solution: "Comprehensive business plan with market analysis, financial projections, and compelling pitch deck",
      results: [
        { metric: "Funding Raised", value: "$2.5M seed", detail: "Oversubscribed round" },
        { metric: "Investor Meetings", value: "32 meetings", detail: "From our outreach" },
        { metric: "Valuation", value: "$10M", detail: "Pre-money valuation" },
      ],
      testimonial: "The business plan and pitch deck were instrumental in our funding success. We closed our seed round in 8 weeks with multiple term sheets.",
      author: "James Wilson, Founder & CEO"
    },
    {
      title: "E-commerce Market Entry",
      client: "GreenHome Products",
      industry: "E-commerce / Retail",
      challenge: "Needed go-to-market strategy and financial model for entering competitive sustainable products market",
      solution: "Detailed market analysis, channel strategy, and 3-year financial projections with CAC/LTV modeling",
      results: [
        { metric: "Revenue (Year 1)", value: "$1.2M", detail: "Exceeded projections by 20%" },
        { metric: "Customer Acquisition", value: "15,000", detail: "First 6 months" },
        { metric: "Profit Margin", value: "32%", detail: "Above industry average" },
      ],
      testimonial: "The GTM strategy and financial model were spot-on. We knew exactly what to execute and how to measure success.",
      author: "Sarah Martinez, Co-founder"
    },
    {
      title: "Healthcare Series A Success",
      client: "MediConnect",
      industry: "Healthcare Technology",
      challenge: "Needed updated business plan and pitch deck for Series A with proven traction metrics",
      solution: "Refreshed business plan highlighting traction, updated financials, and Series A-focused pitch deck",
      results: [
        { metric: "Series A Raised", value: "$12M", detail: "Led by top VC" },
        { metric: "Valuation", value: "$45M", detail: "Post-money" },
        { metric: "Time to Close", value: "12 weeks", detail: "Fast fundraising" },
      ],
      testimonial: "They transformed our story into a compelling narrative that resonated with VCs. Worth every penny.",
      author: "Dr. Michael Roberts, CEO"
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
            Real results from real businesses we've helped succeed
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
                    <div className="p-8 bg-gradient-to-br from-emerald-950/50 to-teal-950/50">
                      <Badge variant="secondary" className="mb-4">{study.industry}</Badge>
                      <h3 className="text-3xl font-bold text-white mb-2">{study.title}</h3>
                      <p className="text-emerald-400 mb-6">{study.client}</p>

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

                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <MessageSquare className="w-6 h-6 text-emerald-400 mb-2" />
                        <p className="text-gray-300 italic mb-2">"{study.testimonial}"</p>
                        <p className="text-sm text-gray-400">{study.author}</p>
                      </div>
                    </div>

                    <div className="p-8">
                      <h4 className="text-xl font-bold text-white mb-6">Key Outcomes</h4>
                      <div className="space-y-6">
                        {study.results.map((result, i) => (
                          <div key={i} className="border-b border-white/10 pb-6 last:border-0">
                            <div className="mb-2">
                              <span className="text-sm text-gray-400">{result.metric}</span>
                            </div>
                            <div className="text-3xl font-bold text-emerald-400 mb-1">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-400">{result.detail}</div>
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

function FAQSection() {
  const faqs = [
    {
      question: "What's included in a business plan?",
      answer: "A comprehensive business plan includes: executive summary, company overview, market analysis, competitive analysis, marketing & sales strategy, operations plan, management team, financial projections (3-5 years), funding requirements, and appendices. We customize based on your specific needs and audience."
    },
    {
      question: "How long does it take to create a business plan?",
      answer: "Timeline varies by package: Startup Essentials (2-3 weeks), Growth Package (4-6 weeks), Enterprise (6-8 weeks). The process involves discovery, drafting, review cycles, and refinement. We work efficiently while ensuring quality and accuracy."
    },
    {
      question: "Do you help with fundraising?",
      answer: "While we don't directly raise funds, we provide investor-ready plans and pitch decks that position you for funding success. We also offer pitch coaching, Q&A preparation, and can introduce you to our network of investors and accelerators based on fit."
    },
    {
      question: "Can you update an existing business plan?",
      answer: "Absolutely! Many clients need plan updates for new funding rounds, pivots, or annual reviews. We can refresh your existing plan with updated financials, traction metrics, market data, and strategic direction. Often more cost-effective than creating from scratch."
    },
    {
      question: "What industries do you serve?",
      answer: "We work across industries including SaaS, e-commerce, healthcare, fintech, consumer products, marketplaces, and B2B services. Our team has created 200+ plans across diverse sectors. We research your specific industry thoroughly to ensure accuracy and credibility."
    },
    {
      question: "How do you ensure financial projections are realistic?",
      answer: "We base projections on: industry benchmarks, comparable companies, your historical data (if available), realistic growth assumptions, and conservative revenue modeling. We include scenario planning (best/base/worst case) and clearly document all assumptions for investor scrutiny."
    },
    {
      question: "What's the difference between a business plan and pitch deck?",
      answer: "A business plan is comprehensive (30-50 pages) for detailed review. A pitch deck is concise (15-20 slides) for presentations. Both tell your story but serve different purposes. Most clients need both: the deck to get meetings, the plan to close deals."
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
            Planning <span className="gradient-text">Questions Answered</span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about our business planning services
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
              <Card className="group hover:border-emerald-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
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
          <p className="text-gray-400 mb-4">Ready to get started?</p>
          <Button variant="outline" size="lg">
            Schedule Strategy Call
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          y: [0, 50, 0],
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
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Investor-Ready Plan?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Schedule a free strategy session to discuss your business goals and funding needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              <Calendar className="w-5 h-5" />
              Book Strategy Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" className="border-white/20 hover:bg-white/10">
              Download Sample Plan
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>90% funding success rate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>$50M+ raised by clients</span>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400">4.9/5 from 200+ clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
