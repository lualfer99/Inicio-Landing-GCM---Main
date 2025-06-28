import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogDb } from "@/lib/supabase-config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Eye, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await blogDb.getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Artículo no encontrado",
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      authors: post.author ? [post.author.name] : undefined,
      images: post.image_url ? [{ url: post.image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image_url ? [post.image_url] : undefined,
    },
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await blogDb.getPostBySlug(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  // Get related posts
  const relatedPosts = await blogDb.getRelatedPosts(post.id, post.keywords, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <Card className="overflow-hidden">
              {/* Featured Image */}
              {post.image_url && (
                <div className="relative h-64 md:h-96">
                  <Image
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {post.featured && <Badge className="absolute top-4 left-4 bg-blue-600">Destacado</Badge>}
                </div>
              )}

              <CardHeader className="pb-4">
                {/* Categories */}
                {post.category_names && post.category_names.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.category_names.map((category, index) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}

                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {post.title}
                </CardTitle>

                {post.description && <p className="text-xl text-gray-600 mt-4">{post.description}</p>}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t text-sm text-gray-500">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.reading_time} min de lectura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.view_count} visualizaciones</span>
                  </div>
                </div>

                {/* Share Button */}
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    Compartir
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Keywords */}
                {post.keywords.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Palabras clave:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Author Bio */}
                {post.author && post.author.bio && (
                  <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sobre el autor</h3>
                    <div className="flex items-start gap-4">
                      {post.author.avatar_url && (
                        <Image
                          src={post.author.avatar_url || "/placeholder.svg"}
                          alt={post.author.name}
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                        <p className="text-gray-600 mt-1">{post.author.bio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Artículos Relacionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                        <div className="flex gap-3">
                          {relatedPost.image_url && (
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={relatedPost.image_url || "/placeholder.svg"}
                                alt={relatedPost.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{relatedPost.reading_time} min</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Necesitas ayuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Nuestros expertos pueden ayudarte con la creación y gestión de tu LLC.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/#consulta">Consulta Gratuita</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
