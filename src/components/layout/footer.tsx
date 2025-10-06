"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "Business Planning", href: "/services/business-planning" },
    { label: "Tokenomics", href: "/services/tokenomics" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  Resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Documentation", href: "/docs" },
    { label: "Support", href: "/support" },
    { label: "FAQ", href: "/faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
}

const socialLinks = [
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "hover:bg-blue-400 hover:text-white",
    gradient: "from-blue-400 to-blue-500"
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:bg-blue-600 hover:text-white",
    gradient: "from-blue-600 to-blue-700"
  },
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
    color: "hover:bg-gray-800 hover:text-white",
    gradient: "from-gray-700 to-gray-900"
  },
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:bg-blue-500 hover:text-white",
    gradient: "from-blue-500 to-blue-600"
  },
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#F8FAFC] to-white border-t border-slate-200 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-aiplace-blue/5 rounded-full mix-blend-normal filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-aiplace-purple/5 rounded-full mix-blend-normal filter blur-3xl opacity-60 pointer-events-none" />

      {/* Gradient accent bar with animation */}
      <motion.div
        className="h-1.5 bg-gradient-to-r from-aiplace-purple via-aiplace-blue to-aiplace-cyan"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo with premium brand effects */}
              <Link href="/" className="inline-block mb-8 group">
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative"
                >
                  {/* Multi-layer animated glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-aiplace-blue/30 via-aiplace-purple/30 to-aiplace-cyan/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 pointer-events-none"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />

                  <Image
                    src="/images/logo.png"
                    alt="AiPlace - Where Creativity Meets AI"
                    width={220}
                    height={60}
                    className="h-16 w-auto object-contain relative z-10 drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                  />

                  {/* Brand accent line */}
                  <motion.div
                    className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-aiplace-blue via-aiplace-purple to-aiplace-cyan rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.div>
              </Link>

              <p className="text-slate-600 mb-8 max-w-sm leading-relaxed text-base">
                Your Partner in Digital Innovation & AI Solutions. Transforming
                businesses with cutting-edge technology and strategic expertise.
              </p>

              {/* Contact info with enhanced styling */}
              <div className="space-y-4">
                <motion.a
                  href="mailto:hello@aiplace.com"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-aiplace-purple to-aiplace-blue flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">hello@aiplace.com</span>
                </motion.a>
                <motion.a
                  href="tel:+1234567890"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-aiplace-blue to-aiplace-cyan flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">+1 (234) 567-890</span>
                </motion.a>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-aiplace-cyan to-teal-500 flex items-center justify-center shadow-md">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">San Francisco, CA 94102</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links columns with enhanced styling */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h3 className="text-[#1E293B] font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-aiplace-blue to-aiplace-purple rounded-full" />
                {category}
              </h3>
              <ul className="space-y-3.5">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-aiplace-blue transition-all duration-300 inline-flex items-center gap-2 group"
                    >
                      <span className="relative font-medium">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-aiplace-purple via-aiplace-blue to-aiplace-cyan group-hover:w-full transition-all duration-300" />
                      </span>
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter section with premium styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-slate-200 pt-16 mb-16"
        >
          <div className="max-w-2xl mx-auto text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-[#1E293B] font-bold text-2xl mb-3 bg-gradient-to-r from-aiplace-blue via-aiplace-purple to-aiplace-pink bg-clip-text text-transparent">
                  Stay in the Loop
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Get the latest updates on AI, web development, and digital innovation delivered to your inbox
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3 lg:min-w-[400px]">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white border-2 border-slate-200 focus:border-aiplace-blue focus:ring-2 focus:ring-aiplace-blue/20 rounded-xl h-12 px-4 text-base transition-all duration-300"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-aiplace-purple via-aiplace-blue to-aiplace-cyan hover:from-aiplace-purple/90 hover:via-aiplace-blue/90 hover:to-aiplace-cyan/90 text-white font-semibold px-8 shadow-lg hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all duration-300 rounded-xl whitespace-nowrap group"
                >
                  <span className="relative z-10">Subscribe</span>
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </Button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Bottom section with enhanced styling */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-slate-200">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 text-base font-medium"
          >
            © {new Date().getFullYear()} AiPlace. All rights reserved.
          </motion.p>

          {/* Social links with premium animations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-xl bg-white border-2 border-slate-200 hover:border-transparent flex items-center justify-center text-slate-700 transition-all duration-300 shadow-md hover:shadow-xl ${social.color} relative overflow-hidden group`}
                  aria-label={social.label}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <Icon className="w-5 h-5 relative z-10 group-hover:text-white transition-colors" />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Back to top with enhanced styling */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-slate-600 hover:text-aiplace-blue hover:bg-aiplace-blue/5 font-semibold rounded-xl px-6 group transition-all duration-300"
            >
              <span>Back to top</span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="ml-2"
              >
                ↑
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient accent with animation */}
      <motion.div
        className="h-1.5 bg-gradient-to-r from-aiplace-cyan via-aiplace-blue to-aiplace-purple"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </footer>
  )
}
