import type { Metadata } from "next"
import { supabase, type BlogPost, formatDate } from "@/lib/supabase-blog"
import { BlogHeader } from "@/components/blog/blog-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Blog - GCM Asesores | Noticias y Consejos sobre LLCs",
  description:
    "Mantente actualizado con las últimas noticias, consejos y estrategias sobre LLCs, optimización fiscal y gestión empresarial para emprendedores digitales.",
  keywords: ["blog", "LLC", "consejos fiscales", "emprendedores", "Estados Unidos", "España"],
  openGraph: {
    title: "Blog - GCM Asesores",
    description: "Noticias y consejos sobre LLCs y optimización fiscal",
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog de <span className="text-blue-600">GCM Asesores</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente actualizado con las últimas noticias, consejos y estrategias sobre LLCs, optimización fiscal y
            gestión empresarial para emprendedores digitales.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  {post.image_url ? (
                    <Image
                      src={post.image_url || "/placeholder.svg"}
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

                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {post.description && <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>}

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

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Leer más →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay posts disponibles</h2>
            <p className="text-gray-600">Vuelve pronto para ver nuestro contenido.</p>
          </div>
        )}
      </main>
    </div>
  )
}
