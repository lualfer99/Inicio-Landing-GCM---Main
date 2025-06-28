import type { Metadata } from "next"
import { blogDb } from "@/lib/supabase-config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Eye, User, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Blog - GCM Asesores | Guías sobre LLCs y Fiscalidad Internacional",
  description:
    "Descubre nuestras guías expertas sobre creación de LLCs en Estados Unidos, optimización fiscal y estrategias para emprendedores digitales españoles.",
  keywords: ["blog", "LLC", "fiscalidad", "Estados Unidos", "España", "emprendedores", "asesoría fiscal"],
  openGraph: {
    title: "Blog - GCM Asesores",
    description: "Guías expertas sobre LLCs y fiscalidad internacional",
    type: "website",
    url: "https://gcmasesores.io/blog",
  },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPage() {
  let posts: any[] = []
  let categories: any[] = []
  let featuredPosts: any[] = []
  let error = null

  try {
    // Fetch data with error handling
    const [postsResult, categoriesResult, featuredResult] = await Promise.allSettled([
      blogDb.getPosts(true, 12),
      blogDb.getCategories(),
      blogDb.getFeaturedPosts(3),
    ])

    posts = postsResult.status === "fulfilled" ? postsResult.value : []
    categories = categoriesResult.status === "fulfilled" ? categoriesResult.value : []
    featuredPosts = featuredResult.status === "fulfilled" ? featuredResult.value : []

    if (postsResult.status === "rejected") {
      console.error("Error fetching posts:", postsResult.reason)
    }
    if (categoriesResult.status === "rejected") {
      console.error("Error fetching categories:", categoriesResult.reason)
    }
    if (featuredResult.status === "rejected") {
      console.error("Error fetching featured posts:", featuredResult.reason)
    }
  } catch (err) {
    console.error("Error in blog page:", err)
    error = err instanceof Error ? err.message : "Error desconocido"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog de GCM Asesores</h1>
            <p className="text-xl text-gray-600 mb-8">
              Guías, consejos y actualizaciones sobre LLCs, fiscalidad internacional y emprendimiento digital
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input type="search" placeholder="Buscar artículos..." className="pl-4 pr-12" />
                <Button size="sm" className="absolute right-1 top-1">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">Error al cargar el contenido: {error}</p>
            <p className="text-red-600 text-sm mt-2">
              Por favor, asegúrate de que la base de datos esté configurada correctamente.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {post.image_url && (
                        <div className="relative h-48">
                          <Image
                            src={post.image_url || "/placeholder.svg?height=200&width=400"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-2 left-2 bg-blue-600">Destacado</Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.reading_time} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.view_count}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.published_at || post.created_at)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Todos los Artículos</h2>

              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md mx-auto">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Próximamente</h3>
                    <p className="text-blue-600">Estamos preparando contenido valioso para ti. ¡Vuelve pronto!</p>
                    <p className="text-blue-500 text-sm mt-2">
                      Mientras tanto, puedes solicitar una consulta gratuita.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {post.image_url && (
                        <div className="relative h-48">
                          <Image
                            src={post.image_url || "/placeholder.svg?height=200&width=400"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          {post.featured && <Badge className="absolute top-2 left-2 bg-blue-600">Destacado</Badge>}
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.description}</p>

                        {/* Keywords */}
                        {post.keywords && post.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.keywords.slice(0, 3).map((keyword: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                            {post.keywords.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{post.keywords.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.reading_time} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.view_count}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.published_at || post.created_at)}
                          </span>
                        </div>

                        {post.author && (
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{post.author.name}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            {categories.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/blog/categoria/${category.slug}`}
                        className="block p-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        {category.description && <p className="text-xs text-gray-500 mt-1">{category.description}</p>}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Recibe las últimas guías y actualizaciones sobre LLCs y fiscalidad internacional.
                </p>
                <div className="space-y-2">
                  <Input type="email" placeholder="Tu email" />
                  <Button className="w-full">Suscribirse</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas asesoría personalizada?</h2>
            <p className="text-gray-600 mb-6">
              Nuestros expertos pueden ayudarte con la creación de tu LLC y optimización fiscal.
            </p>
            <Link
              href="/#consultation"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Solicitar Consulta Gratuita
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
