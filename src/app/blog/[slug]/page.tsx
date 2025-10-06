import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BlogCard } from '@/components/blog/BlogCard'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { Newsletter } from '@/components/blog/Newsletter'
import { getBlogPost, getRelatedPosts, blogPosts } from '@/data/blog-posts'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - AiPlace Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, 3)
  const currentUrl = `https://aiplace.com/blog/${params.slug}`

  // Process content to add IDs to headings for TOC
  const processedContent = post.content
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '')
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return `<h2 id="${id}">${text}</h2>`
      }
      if (line.startsWith('### ')) {
        const text = line.replace('### ', '')
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return `<h3 id="${id}">${text}</h3>`
      }
      if (line.startsWith('```')) {
        return line.replace('```', '<pre><code class="language-')
      }
      return line
    })
    .join('\n')

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

          <div className="container max-w-4xl mx-auto relative z-10">
            <Link href="/blog" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>

            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              {post.category}
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-300">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium text-white">{post.author.name}</div>
                  <div className="text-sm text-gray-400">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-white/5 text-gray-300 border-white/10"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            <ShareButtons title={post.title} url={currentUrl} />
          </div>
        </section>

        {/* Featured Image */}
        <section className="px-4 mb-12">
          <div className="container max-w-4xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-4 pb-20">
          <div className="container max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_300px] gap-12">
              {/* Article Content */}
              <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 prose-strong:text-white prose-code:text-purple-300 prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                <TableOfContents />

                {/* Author Card */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-bold text-white mb-4">About the Author</h3>
                  <div className="flex gap-3 mb-4">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium text-white">{post.author.name}</div>
                      <div className="text-sm text-gray-400">{post.author.role}</div>
                    </div>
                  </div>
                </Card>
              </aside>
            </div>
          </div>
        </section>

        {/* Share Section */}
        <section className="px-4 pb-12">
          <div className="container max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-8">
              <h3 className="text-xl font-bold text-white mb-4">Share this article</h3>
              <ShareButtons title={post.title} url={currentUrl} />
            </Card>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-4 pb-12">
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Comments Placeholder */}
        <section className="px-4 pb-12">
          <div className="container max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Comments</h3>
              <p className="text-gray-400 mb-6">
                Join the discussion! Share your thoughts and questions below.
              </p>
              <Button variant="outline" className="border-white/10 hover:bg-white/10">
                Load Comments
              </Button>
            </Card>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="px-4 pb-20">
          <div className="container max-w-4xl mx-auto">
            <Newsletter />
          </div>
        </section>
      </div>
    </>
  )
}
