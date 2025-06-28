import { blogDb } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, User, Clock } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

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
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default async function BlogPage() {
  let posts = []
  let error = null

  try {
    posts = await blogDb.getPosts(true) // Only published posts
  } catch (err) {
    console.error("Error fetching posts:", err)
    error = err instanceof Error ? err.message : "Failed to load posts"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog de GCM Asesores</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guías expertas sobre creación de LLCs, optimización fiscal y estrategias para emprendedores digitales que
              operan entre España y Estados Unidos.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Error al cargar el blog</h2>
              <p className="text-red-600 text-sm">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Por favor, asegúrate de que la base de datos esté configurada correctamente.
              </p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Próximamente</h2>
              <p className="text-blue-600">Estamos preparando contenido valioso para ti. ¡Vuelve pronto!</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {post.featured && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Destacado
                      </Badge>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {calculateReadingTime(post.content)} min
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  {post.description && <CardDescription className="line-clamp-3">{post.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Keywords */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.keywords.slice(0, 3).map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {post.keywords.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.keywords.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        {formatDate(post.created_at)}
                      </div>
                      {post.author && (
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author.name}
                        </div>
                      )}
                    </div>

                    {/* Read more link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      Leer más →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
