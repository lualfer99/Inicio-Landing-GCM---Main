"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { blogDb, formatDate, calculateReadingTime, type BlogPost } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

export default function BlogPostClientPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const slug = params.slug as string
        const postData = await blogDb.getPostBySlug(slug)

        if (!postData || !postData.published) {
          setError("Post no encontrado")
        } else {
          setPost(postData)
        }
      } catch (err) {
        setError("Error al cargar el post")
        console.error("Error loading post:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BlogHeader showBackButton={true} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post no encontrado</h1>
          <p className="text-gray-600 mb-8">El artículo que buscas no existe o ha sido eliminado.</p>
          <Button asChild>
            <Link href="/blog">Volver al blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  const readingTime = calculateReadingTime(post.content)

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader showBackButton={true} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al blog
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {post.description && <p className="text-xl text-gray-600 mb-6">{post.description}</p>}

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readingTime} min de lectura
              </div>
            </div>

            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>

          {post.keywords && post.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">¿Te ha resultado útil este artículo?</h3>
            <p className="text-blue-700 mb-4">
              En GCM Asesores podemos ayudarte con todos los aspectos legales y fiscales de tu LLC.
            </p>
            <Button asChild>
              <Link href="/#consultation">Solicitar Consulta Gratuita</Link>
            </Button>
          </div>
        </footer>
      </article>
    </div>
  )
}
