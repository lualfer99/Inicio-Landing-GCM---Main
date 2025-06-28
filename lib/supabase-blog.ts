import { createClient } from "@supabase/supabase-js"

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

// Blog storage functions
export async function uploadBlogImage(file: File): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from("images").upload(`blog/${filePath}`, file)

    if (uploadError) {
      return { url: null, error: uploadError.message }
    }

    const { data } = supabase.storage.from("images").getPublicUrl(`blog/${filePath}`)

    return { url: data.publicUrl, error: null }
  } catch (error) {
    return { url: null, error: "Upload failed" }
  }
}

export async function deleteBlogImage(url: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const urlParts = url.split("/")
    const fileName = urlParts[urlParts.length - 1]
    if (!fileName) return { success: false, error: "Invalid URL" }

    const { error } = await supabase.storage.from("images").remove([`blog/${fileName}`])

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: "Delete failed" }
  }
}

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
