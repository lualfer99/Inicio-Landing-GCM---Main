import type { MetadataRoute } from "next"
import { supabase } from "@/lib/supabase-blog"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gcmasesores.io"

  // Get all published blog posts
  const { data: posts } = await supabase.from("blog_posts").select("slug, updated_at").eq("published", true)

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/gestoria-para-llcs`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]

  // Blog post pages
  const blogPages = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
