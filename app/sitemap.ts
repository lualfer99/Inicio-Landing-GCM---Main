import type { MetadataRoute } from "next"
import { supabase } from "@/lib/supabase-blog"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gcmasesores.io"

  // Get published blog posts
  const { data: posts } = await supabase.from("blog_posts").select("slug, updated_at").eq("published", true)

  const blogPosts =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/gestoria-para-llcs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogPosts,
  ]
}
