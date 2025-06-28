import type { Metadata } from "next"
import { supabase, type BlogPost, formatDate, extractExcerpt } from "@/lib/supabase-blog"
import { BlogHeader } from "@/components/blog/blog-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Tag, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Blog - GCM Asesores | Guías sobre LLCs y Fiscalidad",
  description:
    "Descubre guías completas sobre creación y gestión de LLCs, optimización fiscal y estrategias para emprendedores digitales.",
  keywords: ["blog", "LLC", "fiscalidad", "emprendedores", "Estados Unidos", "España", "guías"],
  openGraph: {
    title: "Blog - GCM Asesores",
    description: "Guías completas sobre LLCs y fiscalidad para emprendedores digitales",
    type: "website",
    url: "https://gcmasesores.io/blog",
  },
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_users (
        name,
        email
      )
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data || []
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog de GCM Asesores</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guías completas sobre creación y gestión de LLCs, optimización fiscal y estrategias para emprendedores
            digitales
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                {post.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image_url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Keywords */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.keywords.slice(0, 3).map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            <Tag className="h-3 w-3" />
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description/Excerpt */}
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.description || extractExcerpt(post.content)}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.created_at)}
                      </div>
                      {post.blog_users && <span>Por {post.blog_users.name}</span>}
                    </div>

                    {/* Read More Button */}
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all bg-transparent"
                      >
                        Leer más
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximamente nuevos artículos</h2>
            <p className="text-gray-600 mb-8">
              Estamos preparando contenido valioso sobre LLCs y fiscalidad para emprendedores.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Volver al inicio</Button>
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas asesoría personalizada?</h2>
          <p className="text-xl mb-8 opacity-90">Agenda una consulta gratuita con nuestros expertos en LLCs</p>
          <Link href="/#consulta">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Agendar Asesoría Gratuita
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
