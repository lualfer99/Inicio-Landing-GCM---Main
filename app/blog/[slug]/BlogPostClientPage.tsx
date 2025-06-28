"use client"

import Image from "next/image"
import Link from "next/link"
import { BlogHeader } from "@/components/blog/blog-header"
import { formatDate, type Post } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"

interface BlogPostClientPageProps {
  post: Post
}

export function BlogPostClientPage({ post }: BlogPostClientPageProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description || "",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("URL copied to clipboard!")
    }
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image_urls?.length ? post.image_urls[0] : undefined,
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
    keywords: post.keywords?.join(", "),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        <BlogHeader />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-blue-600 hover:text-blue-700">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </div>
              {post.blog_users && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.blog_users.name}
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={handleShare} className="ml-auto flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

            {post.description && <p className="text-xl text-gray-600 leading-relaxed mb-6">{post.description}</p>}

            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}

            {/* Featured Image */}
            {post.image_urls && post.image_urls.length > 0 && (
              <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.image_urls[0] || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
            />
          </article>

          {/* Image Gallery */}
          {post.image_urls && post.image_urls.length > 1 && (
            <section className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Galería de imágenes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {post.image_urls.slice(1).map((imageUrl, index) => (
                  <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={`${post.title} - Imagen ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda con tu LLC?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nuestro equipo de expertos puede ayudarte a crear y gestionar tu LLC en Estados Unidos. Agenda una
              consulta gratuita para conocer más sobre nuestros servicios.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/#consultation">Agenda tu consulta gratuita</Link>
            </Button>
          </section>
        </main>
      </div>
    </>
  )
}
