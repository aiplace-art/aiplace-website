'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    const elements = article.querySelectorAll('h2, h3')
    const headingData: Heading[] = Array.from(elements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }))

    setHeadings(headingData)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    elements.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6 sticky top-24">
      <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? 'ml-4' : ''}
            >
              <a
                href={`#${heading.id}`}
                className={`text-sm transition-colors hover:text-purple-400 ${
                  activeId === heading.id
                    ? 'text-purple-400 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  )
}
