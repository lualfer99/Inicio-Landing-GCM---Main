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
      title: "Artículo no encontrado - GCM Asesores",
      description: "El artículo que buscas no existe o ha sido eliminado.",
    }
  }

  return {
    title: `${post.title} - GCM Asesores`,
    description: post.description || post.excerpt || "Artículo del blog de GCM Asesores",
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt || "",
      type: "article",
      publishedTime: post.published_at || post.created_at,
      authors: post.author ? [post.author.name] : [],
      images: post.image_url ? [{ url: post.image_url }] : [],
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

  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = await blogDb.getRelatedPosts(post.id, post.keywords, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            {post.image_url && (
              <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                {post.featured && <Badge className="absolute top-4 left-4 bg-blue-600 text-white">Destacado</Badge>}
              </div>
            )}

            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>

              {post.description && <p className="text-xl text-gray-600 leading-relaxed">{post.description}</p>}

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
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

              {/* Keywords */}
              {post.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Share buttons */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <span className="text-sm font-medium text-gray-700">Compartir:</span>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Author Bio */}
          {post.author && post.author.bio && (
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-lg">Sobre el autor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  {post.author.avatar_url && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={post.author.avatar_url || "/placeholder.svg"}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{post.author.name}</h3>
                    <p className="text-gray-600 text-sm">{post.author.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                    {relatedPost.image_url && (
                      <div className="relative h-32">
                        <Image
                          src={relatedPost.image_url || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-base line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600">
                          {relatedPost.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{relatedPost.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relatedPost.reading_time} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(relatedPost.published_at || relatedPost.created_at)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8">
              <CardContent>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Te ha resultado útil este artículo?</h2>
                <p className="text-gray-600 mb-6">
                  Si necesitas asesoría personalizada sobre LLCs o fiscalidad internacional, nuestros expertos pueden
                  ayudarte.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/#consultation">
                    <Button size="lg">Solicitar Consulta Gratuita</Button>
                  </Link>
                  <Link href="/blog">
                    <Button variant="outline" size="lg">
                      Ver más artículos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
