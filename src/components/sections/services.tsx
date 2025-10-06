'use client';

import { useEffect, useRef, useState } from 'react';
import { Brain, Cpu, Zap, MessageSquare } from 'lucide-react';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

const services: Service[] = [
  {
    icon: Brain,
    title: 'AI Development',
    description: 'Custom AI solutions tailored to your business needs. From machine learning models to intelligent automation systems.',
    gradient: 'from-purple-500 via-pink-500 to-red-500',
  },
  {
    icon: Cpu,
    title: 'Machine Learning',
    description: 'Advanced ML algorithms and models for predictive analytics, pattern recognition, and data-driven insights.',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Streamline operations with intelligent automation. Boost productivity and reduce costs with AI-powered workflows.',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
  },
  {
    icon: MessageSquare,
    title: 'Consulting',
    description: 'Expert guidance on AI strategy, implementation, and best practices. Transform your vision into reality.',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
  },
];

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI solutions to transform your business
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards[index];

            return (
              <div
                key={service.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`
                  relative group
                  transform transition-all duration-700 ease-out
                  ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }
                `}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Gradient Border Container */}
                <div className="relative h-full rounded-2xl p-[2px] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-red-500 transition-all duration-500">
                  {/* Card Content */}
                  <div className="h-full bg-gray-900 rounded-2xl p-6 md:p-8 flex flex-col items-start relative overflow-hidden">
                    {/* Background Gradient Effect */}
                    <div
                      className={`
                        absolute inset-0 opacity-0 group-hover:opacity-10
                        bg-gradient-to-br ${service.gradient}
                        transition-opacity duration-500 blur-2xl
                      `}
                    />

                    {/* Icon */}
                    <div
                      className={`
                        relative z-10 p-3 rounded-xl mb-4
                        bg-gradient-to-br ${service.gradient}
                        transform transition-all duration-500
                        group-hover:scale-110 group-hover:rotate-6
                      `}
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-red-400 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-base text-gray-400 leading-relaxed flex-grow group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      {service.description}
                    </p>

                    {/* Hover Arrow Indicator */}
                    <div className="relative z-10 flex items-center text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 mt-auto">
                      Learn More →
                    </div>
                  </div>
                </div>

                {/* Floating Glow Effect */}
                <div
                  className={`
                    absolute -inset-1 rounded-2xl blur-xl opacity-0
                    group-hover:opacity-30 bg-gradient-to-r ${service.gradient}
                    transition-opacity duration-500 -z-10
                  `}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Need something specific? Let's build it together.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
            Get Custom Solution
          </button>
        </div>
      </div>
    </section>
  );
}
