import { supabase, type BlogPost, formatDate, extractExcerpt } from "@/lib/supabase-blog"
import { BlogHeader } from "@/components/blog/blog-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog de GCM Asesores</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente informado con nuestros artículos sobre gestión de LLCs, fiscalidad internacional y consejos para
            emprendedores digitales.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximamente nuevos artículos</h2>
            <p className="text-gray-600">Estamos preparando contenido valioso para ti. ¡Vuelve pronto!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                <Link href={`/blog/${post.slug}`}>
                  {post.image_url && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image_url || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h2>
                      <p className="text-gray-600 text-sm mb-3">{formatDate(post.created_at)}</p>
                    </div>

                    {post.description && <p className="text-gray-700 mb-4 line-clamp-3">{post.description}</p>}

                    {!post.description && (
                      <p className="text-gray-700 mb-4 line-clamp-3">{extractExcerpt(post.content)}</p>
                    )}

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

                    <div className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Leer más →</div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
