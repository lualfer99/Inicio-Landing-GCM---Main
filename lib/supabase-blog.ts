import { createClient } from "@supabase/supabase-js"
import { uploadBlogImage as uploadToS3, deleteBlogImage as deleteFromS3 } from "./s3-storage"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BlogPost = {
  id: string
  title: string
  slug: string
  description: string | null
  content: string
  image_url: string | null
  keywords: string[]
  published: boolean
  author_id: string
  created_at: string
  updated_at: string
  blog_users?: {
    name: string
    email: string
  }
}

export type BlogUser = {
  id: string
  email: string
  name: string
  created_at: string
}

// Re-export S3 storage functions
export const uploadBlogImage = uploadToS3
export const deleteBlogImage = deleteFromS3

// Utility functions
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function extractExcerpt(content: string, maxLength = 150): string {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, "")
  return plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText
}
