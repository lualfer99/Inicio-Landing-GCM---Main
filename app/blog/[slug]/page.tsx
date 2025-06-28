import { supabase, type BlogPost, formatDate } from "@/lib/supabase-blog"
import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_users (
        name,
        email
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post not found - GCM Asesores",
    }
  }

  return {
    title: `${post.title} - GCM Asesores Blog`,
    description: post.description || post.content.substring(0, 160),
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description || post.content.substring(0, 160),
      type: "article",
      url: `https://gcmasesores.io/blog/${post.slug}`,
      images: post.image_url ? [post.image_url] : [],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.content.substring(0, 160),
      images: post.image_url ? [post.image_url] : [],
    },
  }
}

function renderContent(content: string) {
  // Simple markdown to HTML conversion
  let html = content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 text-gray-900">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-4 text-gray-900">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-3 text-gray-900">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^\* (.*$)/gim, '<li class="mb-2">$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 mb-6 space-y-2">$1</ul>')
    .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-blue-600 hover:text-blue-700 underline">$1</a>')
    .replace(/\n\n/g, '</p><p class="mb-6 text-gray-700 leading-relaxed">')
    .replace(/\n/g, "<br>")

  if (html && !html.startsWith("<")) {
    html = '<p class="mb-6 text-gray-700 leading-relaxed">' + html + "</p>"
  }

  return html
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.content.substring(0, 160),
    image: post.image_url,
    author: {
      "@type": "Organization",
      name: "GCM Asesores",
    },
    publisher: {
      "@type": "Organization",
      name: "GCM Asesores",
      logo: {
        "@type": "ImageObject",
        url: "https://gcmasesores.io/images/logo.png",
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at,
    keywords: post.keywords?.join(", "),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <BlogHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-6 bg-transparent">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </Button>

          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {post.image_url && (
              <div className="relative h-64 md:h-96 w-full">
                <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            )}

            <div className="p-8">
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                  {post.updated_at !== post.created_at && <span>• Actualizado: {formatDate(post.updated_at)}</span>}
                </div>

                {post.description && <p className="text-xl text-gray-700 leading-relaxed mb-6">{post.description}</p>}

                {post.keywords && post.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
              />
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}
