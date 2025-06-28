import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogDatabase, formatDate } from "@/lib/supabase"
import { BlogHeader } from "@/components/blog/blog-header"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await BlogDatabase.getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post no encontrado - GCM Asesores",
    }
  }

  return {
    title: `${post.title} - GCM Asesores`,
    description: post.description || `Artículo sobre ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.blog_users ? [post.blog_users.name] : undefined,
      images:
        post.image_urls && post.image_urls.length > 0
          ? [
              {
                url: post.image_urls[0],
                alt: post.title,
              },
            ]
          : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      images: post.image_urls && post.image_urls.length > 0 ? [post.image_urls[0]] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await BlogDatabase.getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: post.blog_users
      ? {
          "@type": "Person",
          name: post.blog_users.name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "GCM Asesores",
      logo: {
        "@type": "ImageObject",
        url: "https://gcmasesores.io/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gcmasesores.io/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-white">
        <BlogHeader showBackButton={true} />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>

              {post.description && <p className="text-xl text-gray-600 leading-relaxed">{post.description}</p>}

              <div className="flex flex-wrap items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </div>

                {post.blog_users && (
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{post.blog_users.name}</span>
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
            </div>
          </header>

          {/* Featured Image */}
          {post.image_urls && post.image_urls.length > 0 && (
            <div className="mb-12">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src={post.image_urls[0] || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
            />
          </article>

          {/* Additional Images */}
          {post.image_urls && post.image_urls.length > 1 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Imágenes adicionales</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {post.image_urls.slice(1).map((url, index) => (
                  <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`${post.title} - Imagen ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-blue-50 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda con tu LLC?</h3>
            <p className="text-gray-600 mb-6">
              Nuestros expertos están listos para ayudarte con todos los aspectos legales y fiscales de tu empresa.
            </p>
            <Button asChild size="lg">
              <Link href="/#consultation">Solicitar consulta gratuita</Link>
            </Button>
          </div>
        </main>
      </div>
    </>
  )
}
