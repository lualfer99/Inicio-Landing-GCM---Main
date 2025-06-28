import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogDatabase, formatDate, extractExcerpt } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - GCM Asesores",
  description: "Artículos y guías sobre LLCs, fiscalidad internacional y servicios para emprendedores digitales.",
  openGraph: {
    title: "Blog - GCM Asesores",
    description: "Artículos y guías sobre LLCs, fiscalidad internacional y servicios para emprendedores digitales.",
    type: "website",
  },
}

export default async function BlogPage() {
  const posts = await BlogDatabase.getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog de GCM Asesores</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Artículos y guías especializadas sobre <strong>LLCs</strong>, <strong>fiscalidad internacional</strong>y
            servicios para emprendedores digitales que buscan expandir sus negocios.
          </p>
        </div>

        {/* Featured Posts */}
        {posts.some((post) => post.featured) && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Artículos Destacados</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {posts
                .filter((post) => post.featured)
                .slice(0, 2)
                .map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {post.image_urls && post.image_urls.length > 0 && (
                      <div className="aspect-video relative">
                        <Image
                          src={post.image_urls[0] || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

                      {post.description && <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>}

                      {post.keywords && post.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.keywords.slice(0, 3).map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Leer más
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Todos los Artículos</h2>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {post.image_urls && post.image_urls.length > 0 && (
                    <div className="aspect-video relative">
                      <Image
                        src={post.image_urls[0] || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description || extractExcerpt(post.content)}
                    </p>

                    {post.keywords && post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.keywords.slice(0, 3).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {post.keywords.length > 3 && (
                          <span className="text-xs text-gray-500">+{post.keywords.length - 3}</span>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Leer más
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No hay artículos publicados</h3>
              <p className="text-gray-600">
                Pronto publicaremos contenido valioso sobre LLCs y fiscalidad internacional.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
