import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BlogUser = {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "subscriber"
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Post = {
  id: string
  title: string
  slug: string
  description: string | null
  content: string
  image_urls: string[] | null
  keywords: string[] | null
  published: boolean
  featured: boolean
  author_id: string | null
  created_at: string
  updated_at: string
  blog_users?: {
    name: string
    email: string
    role: string
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

// Secure database operations with role-based access control
export class BlogDatabase {
  // Get user by email with role verification
  static async getUserByEmail(email: string): Promise<BlogUser | null> {
    try {
      const { data, error } = await supabase
        .from("blog_users")
        .select("*")
        .eq("email", email)
        .eq("is_active", true)
        .single()

      if (error || !data) {
        return null
      }

      return data as BlogUser
    } catch (error) {
      console.error("Error fetching user:", error)
      return null
    }
  }

  // Get posts with role-based filtering
  static async getPosts(userRole?: string): Promise<Post[]> {
    try {
      let query = supabase
        .from("posts")
        .select(`
          *,
          blog_users (
            name,
            email,
            role
          )
        `)
        .order("created_at", { ascending: false })

      // If not admin/editor, only show published posts
      if (!userRole || !["admin", "editor"].includes(userRole)) {
        query = query.eq("published", true)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching posts:", error)
        return []
      }

      return data as Post[]
    } catch (error) {
      console.error("Error fetching posts:", error)
      return []
    }
  }

  // Get single post by slug with role-based access
  static async getPostBySlug(slug: string, userRole?: string): Promise<Post | null> {
    try {
      let query = supabase
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

      // If not admin/editor, only show published posts
      if (!userRole || !["admin", "editor"].includes(userRole)) {
        query = query.eq("published", true)
      }

      const { data, error } = await query.single()

      if (error || !data) {
        return null
      }

      return data as Post
    } catch (error) {
      console.error("Error fetching post:", error)
      return null
    }
  }

  // Create post (admin/editor only)
  static async createPost(postData: Partial<Post>, authorId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from("posts").insert({
        ...postData,
        author_id: authorId,
        slug: postData.slug || generateSlug(postData.title || ""),
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Update post (admin/editor only)
  static async updatePost(postId: string, postData: Partial<Post>): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from("posts")
        .update({
          ...postData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", postId)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Delete post (admin/editor only)
  static async deletePost(postId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Check if user has admin/editor permissions
  static hasAdminAccess(userRole: string): boolean {
    return ["admin", "editor"].includes(userRole)
  }

  // Check if user can edit specific post
  static canEditPost(userRole: string, userId: string, post: Post): boolean {
    if (userRole === "admin") return true
    if (userRole === "editor" && post.author_id === userId) return true
    return false
  }
}
