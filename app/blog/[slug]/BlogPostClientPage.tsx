"use client"

import { useEffect, useState } from "react"
import { BlogDatabase, formatDate, type Post } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

interface BlogPostClientPageProps {
  slug: string
}

export function BlogPostClientPage({ slug }: BlogPostClientPageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await BlogDatabase.getPostBySlug(slug)
        if (data) {
          setPost(data)
        } else {
          setError("Post no encontrado")
        }
      } catch (err) {
        setError("Error al cargar el post")
        console.error("Error loading post:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [slug])

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description || post.title,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "URL copiada",
          description: "La URL se ha copiado al portapapeles.",
        })
      }
    } else if (post) {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "URL copiada",
        description: "La URL se ha copiado al portapapeles.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <BlogHeader showBackButton={true} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="aspect-video bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <BlogHeader showBackButton={true} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Post no encontrado"}</h1>
            <Button asChild>
              <Link href="/blog">Volver al blog</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader showBackButton={true} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8 flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </Button>

          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>

            {post.description && <p className="text-xl text-gray-600 leading-relaxed">{post.description}</p>}

            <div className="flex flex-wrap items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
              </div>

              {post.blog_users && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{post.blog_users.name}</span>
                </div>
              )}
            </div>

            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.image_urls && post.image_urls.length > 0 && (
          <div className="mb-12">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={post.image_urls[0] || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
          />
        </article>

        {/* Additional Images */}
        {post.image_urls && post.image_urls.length > 1 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Imágenes adicionales</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {post.image_urls.slice(1).map((url, index) => (
                <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={url || "/placeholder.svg"}
                    alt={`${post.title} - Imagen ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-blue-50 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda con tu LLC?</h3>
          <p className="text-gray-600 mb-6">
            Nuestros expertos están listos para ayudarte con todos los aspectos legales y fiscales de tu empresa.
          </p>
          <Button asChild size="lg">
            <Link href="/#consultation">Solicitar consulta gratuita</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
