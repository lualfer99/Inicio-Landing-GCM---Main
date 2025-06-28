import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogDatabase } from "@/lib/supabase"
import { BlogPostClientPage } from "./BlogPostClientPage"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await BlogDatabase.getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post not found - GCM Asesores",
    }
  }

  return {
    title: `${post.title} - GCM Asesores`,
    description: post.description || undefined,
    keywords: post.keywords?.join(", "),
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.blog_users?.name ? [post.blog_users.name] : undefined,
      images: post.image_urls?.length ? [{ url: post.image_urls[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || undefined,
      images: post.image_urls?.length ? [post.image_urls[0]] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const posts = await BlogDatabase.getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await BlogDatabase.getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClientPage post={post} />
}
