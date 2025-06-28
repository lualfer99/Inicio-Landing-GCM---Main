import { supabase, type Post, formatDate, extractExcerpt } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog/blog-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - GCM Asesores",
  description: "Artículos y guías sobre LLCs, fiscalidad internacional y servicios para emprendedores digitales.",
  openGraph: {
    title: "Blog - GCM Asesores",
    description: "Artículos y guías sobre LLCs, fiscalidad internacional y servicios para emprendedores digitales.",
    type: "website",
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog de GCM Asesores</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Artículos y guías sobre LLCs, fiscalidad internacional y servicios para emprendedores digitales
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay artículos publicados</h2>
            <p className="text-gray-600">Vuelve pronto para leer nuestros últimos artículos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  {post.image_urls && post.image_urls.length > 0 && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image_urls[0] || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={240}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>

                        {post.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
                        )}

                        {!post.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">{extractExcerpt(post.content)}</p>
                        )}
                      </div>

                      {post.keywords && post.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.keywords.slice(0, 3).map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                              {keyword}
                            </Badge>
                          ))}
                          {post.keywords.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                              +{post.keywords.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
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
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
