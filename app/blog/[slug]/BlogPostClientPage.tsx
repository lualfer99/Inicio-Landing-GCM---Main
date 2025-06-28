"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BlogDatabase, formatDate, type Post } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPostClientPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!params.slug || typeof params.slug !== "string") {
        setError("Slug inválido")
        setLoading(false)
        return
      }

      try {
        const postData = await BlogDatabase.getPostBySlug(params.slug)
        if (postData) {
          setPost(postData)
        } else {
          setError("Post no encontrado")
        }
      } catch (err) {
        console.error("Error loading post:", err)
        setError("Error al cargar el post")
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <BlogHeader />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Cargando artículo...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <BlogHeader />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Post no encontrado"}</h1>
            <p className="text-gray-600 mb-6">El artículo que buscas no existe o ha sido eliminado.</p>
            <Button asChild>
              <Link href="/blog">Volver al Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
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
  )
}
