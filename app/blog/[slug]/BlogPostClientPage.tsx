"use client"

import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Share2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatDate, type Post } from "@/lib/supabase"

interface BlogPostClientPageProps {
  post: Post
}

export default function BlogPostClientPage({ post }: BlogPostClientPageProps) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Featured Image */}
          {post.image_urls && post.image_urls.length > 0 && (
            <div className="aspect-video overflow-hidden">
              <Image
                src={post.image_urls[0] || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            {/* Title and Meta */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

              {post.description && <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.description}</p>}

              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.created_at)}
                  </div>
                  {post.blog_users && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.blog_users.name}
                    </div>
                  )}
                </div>

                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>

              {/* Keywords */}
              {post.keywords && post.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Additional Images Gallery */}
            {post.image_urls && post.image_urls.length > 1 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Galería de imágenes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.image_urls.slice(1).map((imageUrl, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${post.title} - Imagen ${index + 2}`}
                        width={400}
                        height={240}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda con tu LLC?</h2>
          <p className="text-blue-100 mb-6">
            Nuestros expertos pueden ayudarte a crear y gestionar tu LLC de forma profesional.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/#consultation">Solicitar consulta gratuita</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
