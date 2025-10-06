"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Coins,
  Shield,
  FileText,
  Zap,
  Lock,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Clock,
  Layers,
  GitBranch,
  Globe,
  Calendar,
  Star,
  MessageSquare,
  Code2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TokenomicsPage() {
  return (
    <main className="relative bg-gray-950">
      <HeroSection />
      <KeyFeaturesSection />
      <BlockchainExpertiseSection />
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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-950 to-amber-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
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
            <Coins className="w-4 h-4 mr-2" />
            Tokenomics Design & Consulting
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
            Sustainable Tokenomics
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              for Web3 Success
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert token economy design, smart contracts, and blockchain consulting for DeFi, DAOs, and crypto projects.
            Build sustainable tokenomics that drive long-term value.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" className="group">
              Design Your Token Economy
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline">
              View Tokenomics Portfolio
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
            {[
              { icon: Coins, value: "50+", label: "Tokens Designed" },
              { icon: TrendingUp, value: "$100M+", label: "Total Market Cap" },
              { icon: Users, value: "500K+", label: "Token Holders" },
              { icon: Award, value: "100%", label: "Launch Success" },
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
                  <Icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
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
      icon: Coins,
      title: "Token Economy Design",
      description: "Comprehensive token utility definition, supply modeling, distribution strategies, and incentive mechanisms for sustainable growth.",
      benefits: ["Token utility definition", "Supply & distribution models", "Incentive mechanisms", "Sustainability modeling"],
      gradient: "from-orange-600 to-amber-600"
    },
    {
      icon: Code2,
      title: "Smart Contract Development",
      description: "Secure, gas-optimized smart contracts across multiple standards and chains with rigorous testing and audit preparation.",
      benefits: ["ERC-20/721/1155", "Custom contract logic", "Gas optimization", "Multi-chain deployment"],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: FileText,
      title: "Whitepaper Creation",
      description: "Professional technical documentation covering economic models, token mechanics, roadmaps, and investment thesis.",
      benefits: ["Technical documentation", "Economic modeling", "Roadmap development", "Investor-focused content"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Shield,
      title: "Tokenomics Auditing",
      description: "Comprehensive review of existing token economies with game theory analysis, risk assessment, and optimization recommendations.",
      benefits: ["Economic model review", "Security assessment", "Game theory analysis", "Optimization recommendations"],
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: Zap,
      title: "DeFi Integration",
      description: "Design and implement DeFi features including liquidity pools, staking mechanisms, yield farming, and treasury management.",
      benefits: ["Liquidity pool design", "Staking mechanisms", "Yield strategies", "Treasury management"],
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
            Core <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            End-to-end tokenomics design and implementation for Web3 projects
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
                    <CardTitle className="text-2xl group-hover:text-orange-400 transition-colors">
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

function BlockchainExpertiseSection() {
  const blockchains = [
    { name: "Ethereum", icon: Layers, description: "EVM-compatible smart contracts and token standards" },
    { name: "Polygon", icon: GitBranch, description: "Layer 2 scaling with low gas fees" },
    { name: "Binance Smart Chain", icon: Coins, description: "High-throughput DeFi ecosystem" },
    { name: "Solana", icon: Zap, description: "High-speed, low-cost transactions" },
    { name: "Arbitrum", icon: Shield, description: "Optimistic rollup scaling solution" },
    { name: "Base", icon: Globe, description: "Coinbase L2 for mainstream adoption" },
  ]

  const tokenTypes = [
    "Utility Tokens",
    "Governance Tokens",
    "Security Tokens",
    "NFT Projects",
    "Stablecoins",
    "Hybrid Models"
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
            Blockchain <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Multi-chain experience across leading blockchain platforms
          </p>
        </motion.div>

        {/* Supported Blockchains */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blockchains.map((chain, index) => {
            const Icon = chain.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:border-orange-500/50 transition-all">
                  <CardContent className="p-6">
                    <Icon className="w-8 h-8 text-orange-400 mb-3" />
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {chain.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{chain.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Token Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Token Types We Design</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {tokenTypes.map((type, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                {type}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const phases = [
    {
      phase: "01",
      title: "Discovery & Research",
      duration: "1-2 weeks",
      description: "Align on project goals, analyze competitive landscape, review regulatory requirements, and define use cases.",
      deliverables: ["Project goals assessment", "Competitive analysis", "Regulatory review", "Use case definition"]
    },
    {
      phase: "02",
      title: "Economic Modeling",
      duration: "2-3 weeks",
      description: "Design token distribution, vesting schedules, burn mechanisms, staking rewards, and governance rights.",
      deliverables: ["Token distribution model", "Vesting schedules", "Burn mechanisms", "Governance design"]
    },
    {
      phase: "03",
      title: "Technical Architecture",
      duration: "2-3 weeks",
      description: "Select optimal blockchain, design smart contract architecture, plan integrations, and establish security framework.",
      deliverables: ["Blockchain selection", "Smart contract design", "Integration planning", "Security architecture"]
    },
    {
      phase: "04",
      title: "Documentation & Launch Prep",
      duration: "2-3 weeks",
      description: "Create comprehensive whitepaper, coordinate security audits, prepare community materials, and finalize launch strategy.",
      deliverables: ["Whitepaper creation", "Audit coordination", "Community docs", "Launch strategy"]
    },
    {
      phase: "05",
      title: "Post-Launch Support",
      duration: "Ongoing",
      description: "Monitor token metrics and analytics, adjust economic models, manage community, and continuously optimize performance.",
      deliverables: ["Metrics monitoring", "Model adjustments", "Community management", "Continuous optimization"]
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
            Design <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our systematic approach to building sustainable token economies
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
              <Card className="group hover:border-orange-500/50 transition-all">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{phase.phase}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
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
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-orange-600/20 text-orange-300 border border-orange-500/30">
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
      name: "Token Design",
      price: "$15,000 - $30,000",
      description: "Essential tokenomics design for new token launches",
      features: [
        "Token economy design",
        "Basic smart contract (ERC-20)",
        "Whitepaper (10-15 pages)",
        "Token distribution model",
        "3 months support",
        "Launch guidance",
      ],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      name: "Full Token Launch",
      price: "$30,000 - $75,000",
      description: "Comprehensive tokenomics and smart contract suite for serious projects",
      features: [
        "Advanced token economics",
        "Custom smart contracts",
        "Comprehensive whitepaper (20-30 pages)",
        "DeFi integrations",
        "Security audit coordination",
        "6 months support",
        "Community strategy",
        "Vesting contracts",
      ],
      gradient: "from-orange-600 to-amber-600",
      popular: true
    },
    {
      name: "Protocol Development",
      price: "$75,000+",
      description: "Enterprise-grade DeFi protocol with complex tokenomics",
      features: [
        "Multi-token ecosystem design",
        "Advanced DeFi protocols",
        "Complete smart contract suite",
        "Technical whitepaper (40+ pages)",
        "Multi-chain deployment",
        "12 months premium support",
        "Dedicated team",
        "Governance implementation",
        "Treasury management",
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
            Tokenomics <span className="gradient-text">Packages</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Flexible options for every stage of your Web3 journey
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
              <Card className={`h-full relative ${tier.popular ? "border-orange-500/50" : ""}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-600 to-amber-600">
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
                    className={`w-full ${tier.popular ? "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700" : ""}`}
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
          <p className="text-gray-400 mb-4">Need a tokenomics audit?</p>
          <Button variant="outline" size="lg">
            Request Audit Quote
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function CaseStudiesSection() {
  const caseStudies = [
    {
      title: "DeFi Protocol Launch",
      client: "YieldMax Finance",
      industry: "DeFi / Yield Farming",
      challenge: "Launch sustainable yield farming protocol with balanced tokenomics to prevent death spiral",
      solution: "Designed dual-token model with algorithmic supply adjustment and tiered staking rewards",
      results: [
        { metric: "TVL", value: "$15M", detail: "First 90 days" },
        { metric: "Token Holders", value: "12,500", detail: "Active participants" },
        { metric: "APY Stability", value: "15-25%", detail: "Sustainable range" },
      ],
      technologies: ["Ethereum", "Solidity", "Uniswap V3", "Chainlink"],
      testimonial: "The tokenomics design was brilliant. We avoided the common pitfalls and built a sustainable protocol from day one.",
      author: "Alex Chen, Protocol Lead"
    },
    {
      title: "DAO Governance Token",
      client: "CreatorDAO",
      industry: "Creator Economy / DAO",
      challenge: "Design governance token for creator DAO with fair distribution and effective voting mechanism",
      solution: "Quadratic voting system with time-locked staking for governance power and reputation-based rewards",
      results: [
        { metric: "DAO Members", value: "8,000+", detail: "Active governance participants" },
        { metric: "Proposals Passed", value: "45", detail: "First 6 months" },
        { metric: "Voter Participation", value: "62%", detail: "Industry-leading engagement" },
      ],
      technologies: ["Polygon", "Snapshot", "Gnosis Safe", "IPFS"],
      testimonial: "Their DAO tokenomics framework created real alignment between members. Participation rates speak for themselves.",
      author: "Maria Santos, Community Lead"
    },
    {
      title: "NFT Utility Token",
      client: "MetaGallery",
      industry: "NFT / Digital Art",
      challenge: "Create utility token for NFT marketplace with sustainable economics and collector incentives",
      solution: "Deflationary token model with fee burning, staking rewards, and exclusive access utilities",
      results: [
        { metric: "Marketplace Volume", value: "$8M", detail: "Monthly trading" },
        { metric: "Token Burn Rate", value: "3%/month", detail: "Deflationary pressure" },
        { metric: "Stakers", value: "4,200", detail: "Long-term holders" },
      ],
      technologies: ["Solana", "Metaplex", "Serum", "Phantom"],
      testimonial: "The token economics drive real platform usage. Collectors love the staking rewards and exclusive benefits.",
      author: "David Kim, Founder & CEO"
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
            Token Launch <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real tokenomics projects delivering sustainable value
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
                    <div className="p-8 bg-gradient-to-br from-orange-950/50 to-amber-950/50">
                      <Badge variant="secondary" className="mb-4">{study.industry}</Badge>
                      <h3 className="text-3xl font-bold text-white mb-2">{study.title}</h3>
                      <p className="text-orange-400 mb-6">{study.client}</p>

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
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-orange-600/20 text-orange-300 border border-orange-500/30">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <Coins className="w-6 h-6 text-orange-400 mb-2" />
                        <p className="text-gray-300 italic mb-2">"{study.testimonial}"</p>
                        <p className="text-sm text-gray-400">{study.author}</p>
                      </div>
                    </div>

                    <div className="p-8">
                      <h4 className="text-xl font-bold text-white mb-6">Key Metrics</h4>
                      <div className="space-y-6">
                        {study.results.map((result, i) => (
                          <div key={i} className="border-b border-white/10 pb-6 last:border-0">
                            <div className="mb-2">
                              <span className="text-sm text-gray-400">{result.metric}</span>
                            </div>
                            <div className="text-3xl font-bold text-orange-400 mb-1">
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
      question: "What is tokenomics?",
      answer: "Tokenomics is the economic design of a cryptocurrency or token, encompassing supply, distribution, utility, incentives, and governance. Good tokenomics creates sustainable value and aligns stakeholder interests for long-term project success."
    },
    {
      question: "How long does token design take?",
      answer: "Timeline varies by complexity: Basic token design (3-4 weeks), Full launch package (6-8 weeks), Complex DeFi protocols (10-12 weeks). We work efficiently while ensuring thorough economic modeling and security considerations."
    },
    {
      question: "Do you develop smart contracts?",
      answer: "Yes! We handle end-to-end smart contract development including design, coding, testing, gas optimization, and deployment. We work with all major standards (ERC-20, ERC-721, ERC-1155) and can create custom contract logic for unique requirements."
    },
    {
      question: "What blockchains do you support?",
      answer: "We have extensive experience across Ethereum, Polygon, Binance Smart Chain, Solana, Arbitrum, Base, and other EVM-compatible chains. We help you select the optimal blockchain based on your use case, target audience, and technical requirements."
    },
    {
      question: "How do you ensure token sustainability?",
      answer: "We use proven economic models, conduct game theory analysis, implement balanced incentive structures, plan for various market scenarios, and build in mechanisms for long-term value accrual. We avoid ponzi-like mechanics and design for real utility."
    },
    {
      question: "What's included in a whitepaper?",
      answer: "Our whitepapers include: project vision, technical architecture, token utility, economic model, distribution & vesting, governance structure, roadmap, team & advisors, legal considerations, and risk factors. We create both technical and lite versions."
    },
    {
      question: "Do you help with legal compliance?",
      answer: "While we're not lawyers, we design tokenomics with regulatory considerations in mind and can recommend legal partners specializing in crypto. We help structure tokens to minimize regulatory risk and document compliance considerations in whitepapers."
    },
    {
      question: "What happens after token launch?",
      answer: "Post-launch support includes monitoring token metrics, analyzing holder behavior, optimizing economic parameters, coordinating upgrades, managing community communications, and providing ongoing strategic guidance. All packages include support periods."
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
            Tokenomics <span className="gradient-text">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400">
            Common questions about our tokenomics design services
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
              <Card className="group hover:border-orange-500/50 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
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
          <p className="text-gray-400 mb-4">Ready to design your token?</p>
          <Button variant="outline" size="lg">
            Schedule Tokenomics Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-amber-950 to-yellow-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
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
            Ready to Launch Your
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Web3 Token Project?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get a free tokenomics consultation and project assessment. Let's design a sustainable token economy together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" className="group bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
              <Calendar className="w-5 h-5" />
              Book Tokenomics Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" className="border-white/20 hover:bg-white/10">
              Request Token Audit
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>50+ successful launches</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>$100M+ token market cap</span>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400">5.0/5 from Web3 founders</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
