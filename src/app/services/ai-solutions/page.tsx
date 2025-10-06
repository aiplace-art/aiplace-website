"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Brain,
  Bot,
  Eye,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Zap,
  Shield,
  BarChart3,
  FileText,
  Sparkles,
  Calendar,
  Star,
  Clock,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AISolutionsPage() {
  return (
    <main className="relative bg-gray-950">
      <HeroSection />
      <KeyFeaturesSection />
      <TechnologiesSection />
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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950 to-pink-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
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
            <Brain className="w-4 h-4 mr-2" />
            Artificial Intelligence Solutions
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
            AI Solutions That
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Transform Your Business
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Custom machine learning models, NLP, computer vision, and AI chatbots tailored to your needs.
            Harness the power of AI to automate processes, gain insights, and drive growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" className="group">
              Schedule AI Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline">
              Explore AI Use Cases
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
            {[
              { icon: TrendingUp, value: "35%", label: "Avg. Cost Reduction" },
              { icon: Zap, value: "50%", label: "Faster Decisions" },
              { icon: Brain, value: "90%", label: "Prediction Accuracy" },
              { icon: Award, value: "24/7", label: "AI Availability" },
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
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
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
      icon: Brain,
      title: "Machine Learning Models",
      description: "Custom ML models built for your specific use case, from predictive analytics to pattern recognition and anomaly detection.",
      benefits: ["Custom model development", "Predictive analytics", "Pattern recognition", "25% cost reduction achieved"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Advanced NLP solutions for sentiment analysis, text classification, language translation, and intelligent content generation.",
      benefits: ["Sentiment analysis", "Text classification", "Language translation", "Document processing"],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Powerful computer vision capabilities for image recognition, object detection, quality inspection, and OCR solutions.",
      benefits: ["Image recognition", "Object detection", "Quality inspection", "OCR solutions"],
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: Bot,
      title: "AI Chatbots & Assistants",
      description: "Intelligent chatbots for customer service automation, lead qualification, and 24/7 support with multi-language capabilities.",
      benefits: ["Customer service automation", "Lead qualification", "24/7 support", "Multi-language support"],
      gradient: "from-orange-600 to-yellow-600"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Forecasting models to predict customer behavior, assess risks, plan demand, and prevent churn before it happens.",
      benefits: ["Forecasting models", "Behavior prediction", "Risk assessment", "Churn prevention"],
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
            AI <span className="gradient-text">Service Categories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI solutions designed to solve real business challenges
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
                    <CardTitle className="text-2xl group-hover:text-purple-400 transition-colors">
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

function TechnologiesSection() {
  const technologies = [
    { name: "GPT-4 & Claude", category: "LLMs", description: "State-of-the-art language models for advanced NLP tasks" },
    { name: "TensorFlow & PyTorch", category: "Frameworks", description: "Industry-leading ML frameworks for model development" },
    { name: "Hugging Face", category: "Models", description: "Pre-trained models and transformers for NLP" },
    { name: "OpenCV", category: "Computer Vision", description: "Advanced computer vision and image processing" },
    { name: "Scikit-learn", category: "ML Library", description: "Classical machine learning algorithms and tools" },
    { name: "AWS SageMaker", category: "MLOps", description: "Scalable model training and deployment platform" },
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
            AI Technology <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Leveraging cutting-edge AI tools and frameworks to build powerful solutions
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
              <Card className="group hover:border-purple-500/50 transition-all">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{tech.category}</Badge>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
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

function ProcessSection() {
  const phases = [
    {
      phase: "01",
      title: "AI Readiness Assessment",
      duration: "1 week",
      description: "We evaluate your data quality, identify use cases, project ROI, and review infrastructure readiness.",
      deliverables: ["Data quality evaluation", "Use case identification", "ROI projection", "Infrastructure review"]
    },
    {
      phase: "02",
      title: "Strategy Development",
      duration: "1-2 weeks",
      description: "Design solution architecture, select optimal technologies, and create detailed implementation roadmap.",
      deliverables: ["Solution architecture", "Technology selection", "Resource planning", "Project timeline"]
    },
    {
      phase: "03",
      title: "Model Development",
      duration: "4-6 weeks",
      description: "Data preparation, algorithm selection, model training, validation, and performance optimization.",
      deliverables: ["Data preprocessing", "Model training", "Validation & testing", "Performance tuning"]
    },
    {
      phase: "04",
      title: "Integration & Deployment",
      duration: "2-3 weeks",
      description: "Seamless system integration, API development, comprehensive testing, and production deployment.",
      deliverables: ["System integration", "API development", "Testing & validation", "Production deployment"]
    },
    {
      phase: "05",
      title: "Monitoring & Optimization",
      duration: "Ongoing",
      description: "Continuous performance tracking, model retraining, ongoing improvements, and dedicated support.",
      deliverables: ["Performance monitoring", "Model retraining", "Continuous improvement", "Support & maintenance"]
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
            AI Implementation <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our proven methodology for successful AI implementation
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
              <Card className="group hover:border-purple-500/50 transition-all">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{phase.phase}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
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
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30">
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
      name: "AI Pilot",
      price: "$15,000 - $30,000",
      description: "Perfect for testing AI viability with a focused proof-of-concept project",
      features: [
        "Single use case implementation",
        "Basic model development",
        "Integration with existing systems",
        "Performance metrics dashboard",
        "3 months support",
        "ROI analysis",
      ],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      name: "AI Production",
      price: "$30,000 - $100,000",
      description: "Comprehensive AI solution for businesses ready to scale AI across operations",
      features: [
        "Multiple use cases",
        "Advanced model development",
        "Custom API development",
        "MLOps implementation",
        "6 months support",
        "Model retraining",
        "Performance optimization",
        "Training & documentation",
      ],
      gradient: "from-purple-600 to-pink-600",
      popular: true
    },
    {
      name: "AI Enterprise",
      price: "$100,000+",
      description: "Enterprise-grade AI platform with advanced features and dedicated support",
      features: [
        "Enterprise-wide AI deployment",
        "Custom ML infrastructure",
        "Advanced security & compliance",
        "Real-time processing",
        "12 months premium support",
        "Dedicated AI team",
        "Continuous optimization",
        "Custom integrations",
        "Performance SLAs",
      ],
      gradient: "from-orange-600 to-pink-600"
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
            AI Solution <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Flexible packages for every stage of your AI journey
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
              <Card className={`h-full relative ${tier.popular ? "border-purple-500/50" : ""}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
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
                    className={`w-full ${tier.popular ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : ""}`}
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
          <p className="text-gray-400 mb-4">Need a custom AI solution?</p>
          <Button variant="outline" size="lg">
            Calculate AI ROI
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function CaseStudiesSection() {
  const caseStudies = [
    {
      title: "AI Customer Service Automation",
      client: "FinanceHub",
      industry: "Financial Services",
      challenge: "High customer support costs and slow response times affecting customer satisfaction",
      solution: "Custom GPT-4 powered chatbot with banking knowledge base and seamless human handoff",
      results: [
        { metric: "Response Time", before: "4.5 hours", after: "< 2 min", improvement: "-98%" },
        { metric: "Support Costs", before: "$150K/mo", after: "$45K/mo", improvement: "-70%" },
        { metric: "CSAT Score", before: "3.2/5", after: "4.7/5", improvement: "+47%" },
      ],
      technologies: ["GPT-4", "Python", "FastAPI", "PostgreSQL"],
      testimonial: "The AI chatbot handles 80% of our support tickets automatically. Our team can now focus on complex issues while customer satisfaction has never been higher.",
      author: "Lisa Martinez, VP of Customer Success"
    },
    {
      title: "Predictive Maintenance System",
      client: "ManufactureTech",
      industry: "Manufacturing",
      challenge: "Unexpected equipment failures causing production downtime and revenue loss",
      solution: "Computer vision and sensor data ML models to predict equipment failures 48 hours in advance",
      results: [
        { metric: "Downtime", before: "120 hrs/mo", after: "8 hrs/mo", improvement: "-93%" },
        { metric: "Maintenance Cost", before: "$280K/mo", after: "$95K/mo", improvement: "-66%" },
        { metric: "Production Efficiency", before: "78%", after: "96%", improvement: "+23%" },
      ],
      technologies: ["TensorFlow", "OpenCV", "IoT Sensors", "AWS"],
      testimonial: "We went from reactive firefighting to proactive maintenance. The ROI was evident within 3 months.",
      author: "Robert Chen, COO"
    },
    {
      title: "Intelligent Document Processing",
      client: "LegalCorp",
      industry: "Legal Services",
      challenge: "Manual document review taking 100+ hours per case, slowing client delivery",
      solution: "NLP-powered document analysis system with entity extraction and clause detection",
      results: [
        { metric: "Processing Time", before: "120 hrs/case", after: "12 hrs/case", improvement: "-90%" },
        { metric: "Accuracy", before: "92%", after: "98%", improvement: "+6.5%" },
        { metric: "Case Capacity", before: "10/month", after: "50/month", improvement: "+400%" },
      ],
      technologies: ["spaCy", "Hugging Face", "Python", "MongoDB"],
      testimonial: "This AI system is like having 10 junior associates working 24/7 with perfect accuracy.",
      author: "David Thompson, Managing Partner"
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
            AI in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real AI implementations driving measurable business impact
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
                    <div className="p-8 bg-gradient-to-br from-purple-950/50 to-pink-950/50">
                      <Badge variant="secondary" className="mb-4">{study.industry}</Badge>
                      <h3 className="text-3xl font-bold text-white mb-2">{study.title}</h3>
                      <p className="text-purple-400 mb-6">{study.client}</p>

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
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <Sparkles className="w-6 h-6 text-purple-400 mb-2" />
                        <p className="text-gray-300 italic mb-2">"{study.testimonial}"</p>
                        <p className="text-sm text-gray-400">{study.author}</p>
                      </div>
                    </div>

                    <div className="p-8">
                      <h4 className="text-xl font-bold text-white mb-6">Measurable Results</h4>
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

function FAQSection() {
  const faqs = [
    {
      question: "What is AI consulting and do I need it?",
      answer: "AI consulting helps you identify where AI can add value to your business, assess your data readiness, and create an implementation roadmap. If you're considering AI but unsure where to start, consulting provides clarity and direction before significant investment."
    },
    {
      question: "How long does AI implementation take?",
      answer: "Timeline varies by complexity. A simple chatbot can be deployed in 4-6 weeks, while custom ML models typically take 3-6 months. Enterprise-wide AI transformations may take 6-12 months. We provide detailed timelines after the assessment phase."
    },
    {
      question: "Do I need a lot of data for AI?",
      answer: "It depends on the use case. Some AI solutions (like using GPT-4) require minimal data. Custom ML models typically need thousands of examples for good performance. During assessment, we evaluate your data quality and quantity to recommend the best approach."
    },
    {
      question: "What's the cost of AI solutions?",
      answer: "AI projects range from $15,000 for pilots to $100,000+ for enterprise solutions. Costs depend on complexity, data preparation needs, integration requirements, and ongoing support. Most clients see positive ROI within 6-18 months."
    },
    {
      question: "How do you ensure AI accuracy?",
      answer: "We use rigorous testing with validation datasets, continuous monitoring, A/B testing, human-in-the-loop verification for critical decisions, and regular model retraining. We also set clear accuracy thresholds and performance SLAs."
    },
    {
      question: "Can AI integrate with our existing systems?",
      answer: "Yes! We specialize in seamless integrations through APIs, webhooks, and custom connectors. We work with your existing tech stack including CRMs, ERPs, databases, and custom applications to ensure AI enhances rather than disrupts your operations."
    },
    {
      question: "What's the ROI of AI?",
      answer: "ROI varies by use case but clients typically see: 30-50% cost reduction in automated processes, 2-5x faster decision-making, 20-40% revenue increase from personalization, and 15-30% improvement in customer satisfaction. We provide detailed ROI projections before starting."
    },
    {
      question: "Do you provide ongoing AI support?",
      answer: "Yes! All packages include post-deployment support (3-12 months). This covers model monitoring, performance optimization, retraining, bug fixes, and updates. We also offer extended support contracts for continuous improvement and scaling."
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
            AI <span className="gradient-text">Questions Answered</span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about implementing AI in your business
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
              <Card className="group hover:border-purple-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
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
          <p className="text-gray-400 mb-4">Ready to explore AI for your business?</p>
          <Button variant="outline" size="lg">
            Schedule Free AI Assessment
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-pink-950 to-orange-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
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
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Your Business with AI?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get a free AI readiness assessment and ROI projection. Let's explore how AI can drive growth for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Calendar className="w-5 h-5" />
              Schedule AI Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" className="border-white/20 hover:bg-white/10">
              Calculate AI ROI
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free readiness assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Custom ROI projection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No commitment required</span>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400">4.9/5 from 80+ AI projects</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
