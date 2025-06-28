import { supabase, type Post } from "@/lib/supabase"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import BlogPostClientPage from "./BlogPostClientPage"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<Post | null> {
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
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: "Post not found - GCM Asesores",
    }
  }

  const imageUrl = post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined

  return {
    title: `${post.title} - GCM Asesores Blog`,
    description: post.description || `Artículo sobre ${post.title}`,
    keywords: post.keywords?.join(", "),
    openGraph: {
      title: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.blog_users ? [post.blog_users.name] : undefined,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image_urls && post.image_urls.length > 0 ? post.image_urls : undefined,
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
    keywords: post.keywords?.join(", "),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostClientPage post={post} />
    </>
  )
}
