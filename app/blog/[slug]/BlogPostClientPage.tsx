"use client"

import { supabase, type Post, formatDate } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      blog_users (
        name,
        email,
        role
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

export default function BlogPostClientPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPost(params.slug)
      setPost(fetchedPost)
      setLoading(false)
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!post) {
    notFound()
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image_urls && post.image_urls.length > 0 ? post.image_urls : undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
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
    keywords: post.keywords?.join(", "),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <BlogHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-6 bg-transparent">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </Button>
        </div>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          {post.image_urls && post.image_urls.length > 0 && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={post.image_urls[0] || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                  </div>
                  {post.updated_at !== post.created_at && (
                    <span className="text-sm">• Actualizado: {formatDate(post.updated_at)}</span>
                  )}
                  {post.blog_users && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.blog_users.name}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.description || "",
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert("Enlace copiado al portapapeles")
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
              </div>

              {/* Description */}
              {post.description && <div className="text-xl text-gray-700 leading-relaxed mb-6">{post.description}</div>}

              {/* Keywords */}
              {post.keywords && post.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
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

            {/* Additional Images */}
            {post.image_urls && post.image_urls.length > 1 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Imágenes adicionales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.image_urls.slice(1).map((imageUrl, index) => (
                    <div key={index} className="relative aspect-video">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${post.title} - Imagen ${index + 2}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Te ha resultado útil este artículo?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Agenda una consulta gratuita para recibir asesoría personalizada
          </p>
          <Link
            href="/#consulta"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Agendar Asesoría Gratuita
          </Link>
        </div>
      </main>
    </div>
  )
}
