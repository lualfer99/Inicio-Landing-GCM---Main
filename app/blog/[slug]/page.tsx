import { notFound } from "next/navigation"
import { BlogDatabase, formatDate } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await BlogDatabase.getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post no encontrado - GCM Asesores",
    }
  }

  return {
    title: `${post.title} - GCM Asesores`,
    description: post.description || `Artículo sobre ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.blog_users ? [post.blog_users.name] : undefined,
      images:
        post.image_urls && post.image_urls.length > 0
          ? [
              {
                url: post.image_urls[0],
                alt: post.title,
              },
            ]
          : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      images: post.image_urls && post.image_urls.length > 0 ? [post.image_urls[0]] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await BlogDatabase.getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.blog_users?.name || "GCM Asesores",
    },
    publisher: {
      "@type": "Organization",
      name: "GCM Asesores",
      logo: {
        "@type": "ImageObject",
        url: "https://gcmasesores.io/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gcmasesores.io/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-white">
        <BlogHeader />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Blog
              </Link>
            </Button>
          </div>

          {/* Featured Image */}
          {post.image_urls && post.image_urls.length > 0 && (
            <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image_urls[0] || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

            {post.description && <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.description}</p>}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
              </div>

              {post.blog_users && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.blog_users.name}</span>
                </div>
              )}
            </div>

            {/* Keywords */}
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

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Última actualización: {formatDate(post.updated_at)}</div>

              <Button variant="outline" asChild>
                <Link href="/blog">Ver más artículos</Link>
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </>
  )
}
