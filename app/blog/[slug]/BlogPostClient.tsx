"use client"

import { type BlogPost, formatDate } from "@/lib/supabase-blog"
import { BlogHeader } from "@/components/blog/blog-header"
import { Button } from "@/components/ui/button"
import { Calendar, Tag, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  useEffect(() => {
    // Add JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      image: post.image_url || "https://gcmasesores.io/images/logo.png",
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
      datePublished: post.created_at,
      dateModified: post.updated_at,
      keywords: post.keywords?.join(", ") || "",
      url: `https://gcmasesores.io/blog/${post.slug}`,
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [post])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description || `Artículo sobre ${post.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {post.image_url && (
            <div className="relative h-64 md:h-96">
              <Image
                src={post.image_url || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Keywords */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    <Tag className="h-3 w-3" />
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                {post.blog_users && <span>Por {post.blog_users.name}</span>}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2 bg-transparent"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
            </div>

            {/* Description */}
            {post.description && <div className="text-xl text-gray-600 mb-8 leading-relaxed">{post.description}</div>}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Te ha resultado útil este artículo?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Agenda una consulta gratuita para recibir asesoría personalizada
          </p>
          <Link href="/#consulta">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Agendar Asesoría Gratuita
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
