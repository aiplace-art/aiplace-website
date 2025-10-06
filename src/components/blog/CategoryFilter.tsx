'use client'

import { Badge } from '@/components/ui/badge'

const categories = ['All', 'Web Dev', 'AI', 'Business', 'Blockchain'] as const

interface CategoryFilterProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={activeCategory === category ? 'default' : 'outline'}
          className={`cursor-pointer transition-all ${
            activeCategory === category
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent'
              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  )
}
