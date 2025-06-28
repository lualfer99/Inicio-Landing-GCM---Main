import type { Metadata } from "next"
import dynamic from "next/dynamic"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

const getPost = async (slug: string) => {
  \
  const { supabase }
  from
  ;("@/lib/supabase")

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
      title: "Post no encontrado - GCM Asesores",
    }
  }

  return {
    title: `${post.title} - GCM Asesores Blog`,
    description: post.description || post.content.substring(0, 160),
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description || post.content.substring(0, 160),
      type: "article",
      url: `https://gcmasesores.io/blog/${post.slug}`,
      images: post.image_urls && post.image_urls.length > 0 ? [post.image_urls[0]] : [],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.content.substring(0, 160),
      images: post.image_urls && post.image_urls.length > 0 ? [post.image_urls[0]] : [],
    },
  }
}

const BlogPostClientPage = dynamic(() => import("./BlogPostClientPage"), {
  ssr: false,
})

export default function BlogPostPage(props: BlogPostPageProps) {
  return <BlogPostClientPage {...props} />
}
