import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { supabase, type BlogPost, formatDate } from "@/lib/supabase-blog"
import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_users (
        name,
        email
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post no encontrado - GCM Asesores",
    }
  }

  return {
    title: `${post.title} - GCM Asesores Blog`,
    description: post.description || `Lee sobre ${post.title} en el blog de GCM Asesores`,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description || "",
      type: "article",
      url: `https://gcmasesores.io/blog/${post.slug}`,
      images: post.image_url ? [{ url: post.image_url }] : [],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || "",
      images: post.image_url ? [post.image_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image_url,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.blog_users?.name || "GCM Asesores",
    },
    publisher: {
      "@type": "Organization",
      name: "GCM Asesores",
      logo: {
        "@type": "ImageObject",
        url: "https://gcmasesores.io/images/logo.png",
      },
    },
    keywords: post.keywords?.join(", "),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        <BlogHeader />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {post.image_url && (
              <div className="aspect-video relative">
                <Image
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-8">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                {post.description && <p className="text-xl text-gray-600 mb-6">{post.description}</p>}

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.created_at)}
                  </div>
                  {post.blog_users && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.blog_users.name}
                    </div>
                  )}
                </div>

                {post.keywords && post.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {/* Call to Action */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda con tu LLC?</h2>
            <p className="text-gray-600 mb-6">
              Nuestro equipo de expertos está listo para ayudarte con todos los aspectos de tu LLC, desde la creación
              hasta la gestión fiscal.
            </p>
            <Link
              href="/#consulta"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar Asesoría Gratuita
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
