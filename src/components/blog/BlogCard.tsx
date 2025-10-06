import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { BlogPost } from '@/data/blog-posts'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:scale-105 transition-transform cursor-pointer h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent">
              {post.category}
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-grow">
              <div className="text-sm font-medium text-white">
                {post.author.name}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })} · {post.readTime} min read
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
