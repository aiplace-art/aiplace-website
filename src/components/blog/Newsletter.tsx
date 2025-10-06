'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setStatus('success')
    setEmail('')

    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-gray-300">
          Get the latest insights on AI, web development, and digital innovation delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500"
          disabled={status === 'loading' || status === 'success'}
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </Button>
      </form>

      {status === 'success' && (
        <p className="text-green-400 text-sm mt-3 text-center">
          Thanks for subscribing! Check your email to confirm.
        </p>
      )}
    </Card>
  )
}
