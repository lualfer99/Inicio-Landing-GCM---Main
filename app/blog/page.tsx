import { supabase, type Post, formatDate, extractExcerpt } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog/blog-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - GCM Asesores | Noticias y Consejos sobre LLCs",
  description:
    "Mantente informado con nuestro blog sobre gestión de LLCs, fiscalidad internacional y consejos para emprendedores digitales.",
  keywords: ["blog", "LLC", "fiscalidad", "emprendedores", "consejos fiscales", "gestión empresarial"],
  openGraph: {
    title: "Blog - GCM Asesores",
    description: "Noticias y consejos sobre LLCs y fiscalidad internacional",
    type: "website",
    url: "https://gcmasesores.io/blog",
  },
}

async function getPosts(): Promise<Post[]> {
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
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data || []
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog de <span className="text-blue-600">GCM Asesores</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente informado con nuestros artículos sobre gestión de LLCs, fiscalidad internacional y consejos para
            emprendedores digitales.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximamente nuevos artículos</h2>
            <p className="text-gray-600">Estamos preparando contenido valioso para ti. ¡Vuelve pronto!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Featured Image */}
                  <div className="aspect-video relative overflow-hidden">
                    {post.image_urls && post.image_urls.length > 0 ? (
                      <Image
                        src={post.image_urls[0] || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <div className="text-blue-600 text-4xl font-bold">GCM</div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    {/* Meta Info */}
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

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    {post.description && <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>}

                    {!post.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{extractExcerpt(post.content)}</p>
                    )}

                    {/* Keywords */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.keywords.slice(0, 3).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
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

                    {/* Read More */}
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      Leer más
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas asesoría personalizada?</h2>
          <p className="text-xl mb-8 opacity-90">Agenda una consulta gratuita con nuestros expertos en LLCs</p>
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
