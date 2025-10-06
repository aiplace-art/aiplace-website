/**
 * AiPlace Design System Showcase
 * Visual demonstration of all design components and utilities
 */

import React from 'react';

export const DesignShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section with Brand Gradient */}
      <section className="section bg-mesh relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        <div className="container-custom relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-gradient-brand">
              AiPlace
            </h1>
            <p className="text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Where Creativity Meets AI
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="btn-primary">Get Started</button>
              <button className="btn-outline">Learn More</button>
              <button className="btn-secondary">Documentation</button>
              <button className="btn-ghost">Contact</button>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="section-sm container-custom">
        <h2 className="text-4xl font-bold mb-8">Typography System</h2>
        <div className="space-y-6">
          <div>
            <h1 className="mb-2">Heading 1 - Display Large</h1>
            <h2 className="mb-2">Heading 2 - Display Medium</h2>
            <h3 className="mb-2">Heading 3 - Display Small</h3>
            <h4 className="mb-2">Heading 4 - Title Large</h4>
            <h5 className="mb-2">Heading 5 - Title Medium</h5>
            <h6 className="mb-2">Heading 6 - Title Small</h6>
            <p className="text-lg">Large paragraph text for emphasis</p>
            <p className="text-base">Base paragraph text for body content</p>
            <p className="text-sm">Small text for captions and labels</p>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="section-sm bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-8">Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-full h-32 bg-brand-cyan rounded-xl mb-4"></div>
              <h3 className="text-xl font-bold">Cyan</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">#00D4FF</p>
            </div>
            <div className="card text-center">
              <div className="w-full h-32 bg-brand-purple rounded-xl mb-4"></div>
              <h3 className="text-xl font-bold">Purple</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">#9D4EDD</p>
            </div>
            <div className="card text-center">
              <div className="w-full h-32 bg-brand-magenta rounded-xl mb-4"></div>
              <h3 className="text-xl font-bold">Magenta</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">#FF006E</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Gradient Variations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <div className="w-full h-32 bg-gradient-brand rounded-xl mb-4"></div>
                <p className="font-semibold">Brand Gradient</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Cyan → Purple → Magenta</p>
              </div>
              <div className="card">
                <div className="w-full h-32 bg-gradient-animated rounded-xl mb-4"></div>
                <p className="font-semibold">Animated Gradient</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Moving gradient effect</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Components */}
      <section className="section-sm container-custom">
        <h2 className="text-4xl font-bold mb-8">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Standard Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Basic card with border and shadow
            </p>
          </div>

          <div className="card-hover">
            <h3 className="text-xl font-bold mb-2">Hover Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Interactive card with lift effect
            </p>
          </div>

          <div className="card-gradient">
            <h3 className="text-xl font-bold mb-2">Gradient Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Card with gradient hover effect
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-2">Glass Morphism</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Frosted glass effect with backdrop blur
            </p>
          </div>

          <div className="glass-strong p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-2">Strong Glass</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              More opaque glass effect
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="section-sm bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-8">Button Styles</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary</button>
            <button className="btn-secondary">Secondary</button>
            <button className="btn-outline">Outline</button>
            <button className="btn-ghost">Ghost</button>
            <button className="btn-primary" disabled>Disabled</button>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">
                <span className="mr-2">→</span>
                Get Started
              </button>
              <button className="btn-outline">
                Learn More
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Input Fields */}
      <section className="section-sm container-custom">
        <h2 className="text-4xl font-bold mb-8">Form Elements</h2>
        <div className="max-w-2xl space-y-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="input"
          />
          <input
            type="text"
            placeholder="Your name"
            className="input"
          />
          <textarea
            placeholder="Your message"
            className="input min-h-32"
          ></textarea>
        </div>
      </section>

      {/* Effects & Animations */}
      <section className="section-sm bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-8">Effects & Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card hover-lift">
              <h3 className="text-xl font-bold mb-2">Hover Lift</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Hover to see lift animation
              </p>
            </div>

            <div className="card hover-glow">
              <h3 className="text-xl font-bold mb-2">Hover Glow</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Hover to see glow effect
              </p>
            </div>

            <div className="card">
              <div className="animate-float mb-4">
                <div className="w-16 h-16 bg-gradient-brand rounded-full mx-auto"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Float Animation</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Continuous floating motion
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Text Effects</h3>
            <div className="space-y-4">
              <h2 className="text-gradient-brand">Gradient Text Animation</h2>
              <h2 className="text-gradient-brand-reverse">Reverse Gradient Text</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Background Patterns */}
      <section className="section-sm container-custom">
        <h2 className="text-4xl font-bold mb-8">Background Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-mesh p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xl font-bold mb-2">Mesh Gradient</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Multi-point radial gradients
            </p>
          </div>

          <div className="grid-pattern p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xl font-bold mb-2">Grid Pattern</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Subtle grid background
            </p>
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section className="section-sm bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-8">Loading States</h2>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="loading-spinner"></div>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="shimmer w-64 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Spacing System */}
      <section className="section-sm container-custom">
        <h2 className="text-4xl font-bold mb-8">Spacing System</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-brand-purple rounded"></div>
            <span className="text-sm">4px - spacing-1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-purple rounded"></div>
            <span className="text-sm">32px - spacing-8</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 bg-brand-purple rounded"></div>
            <span className="text-sm">64px - spacing-16</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-24 bg-brand-purple rounded"></div>
            <span className="text-sm">96px - spacing-24</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignShowcase;
