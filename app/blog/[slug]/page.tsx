import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { supabase, type BlogPost } from "@/lib/supabase-blog"
import { BlogPostClient } from "./BlogPostClient"

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
    description: post.description || `Artículo sobre ${post.title}`,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      type: "article",
      url: `https://gcmasesores.io/blog/${post.slug}`,
      images: post.image_url ? [{ url: post.image_url, alt: post.title }] : [],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || `Artículo sobre ${post.title}`,
      images: post.image_url ? [post.image_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
