import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface BlogPost {
  id: string
  title: string
  slug: string
  description?: string
  content: string
  image_urls: string[]
  keywords: string[]
  published: boolean
  featured: boolean
  author_id?: string
  created_at: string
  updated_at: string
  author?: {
    id: string
    name: string
    email: string
    role: string
  }
}

export interface BlogUser {
  id: string
  email: string
  name: string
  password_hash: string
  role: "admin" | "editor" | "subscriber"
  is_active: boolean
  created_at: string
  updated_at: string
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

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export class BlogDatabase {
  private client = supabaseAdmin

  async getPosts(published?: boolean): Promise<BlogPost[]> {
    try {
      let query = this.client
        .from("posts")
        .select(`
          *,
          author:blog_users!posts_author_id_fkey (
            id,
            name,
            email,
            role
          )
        `)
        .order("created_at", { ascending: false })

      if (published !== undefined) {
        query = query.eq("published", published)
      }

      const { data, error } = await query

      if (error) {
        console.error("Database error:", error)
        throw new Error(`Failed to fetch posts: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error("Error fetching posts:", error)
      // Fallback query without author join if role column doesn't exist
      try {
        let fallbackQuery = this.client.from("posts").select("*").order("created_at", { ascending: false })

        if (published !== undefined) {
          fallbackQuery = fallbackQuery.eq("published", published)
        }

        const { data: fallbackData, error: fallbackError } = await fallbackQuery

        if (fallbackError) {
          throw new Error(`Fallback query failed: ${fallbackError.message}`)
        }

        return fallbackData || []
      } catch (fallbackError) {
        console.error("Fallback query also failed:", fallbackError)
        return []
      }
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await this.client
        .from("posts")
        .select(`
          *,
          author:blog_users!posts_author_id_fkey (
            id,
            name,
            email,
            role
          )
        `)
        .eq("slug", slug)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          return null // Post not found
        }
        throw new Error(`Failed to fetch post: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error("Error fetching post by slug:", error)
      // Fallback without author join
      try {
        const { data: fallbackData, error: fallbackError } = await this.client
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single()

        if (fallbackError) {
          if (fallbackError.code === "PGRST116") {
            return null
          }
          throw new Error(`Fallback query failed: ${fallbackError.message}`)
        }

        return fallbackData
      } catch (fallbackError) {
        console.error("Fallback query also failed:", fallbackError)
        return null
      }
    }
  }

  async createPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> {
    const { data, error } = await this.client.from("posts").insert(post).select().single()

    if (error) {
      throw new Error(`Failed to create post: ${error.message}`)
    }

    return data
  }

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await this.client.from("posts").update(updates).eq("id", id).select().single()

    if (error) {
      throw new Error(`Failed to update post: ${error.message}`)
    }

    return data
  }

  async deletePost(id: string): Promise<void> {
    const { error } = await this.client.from("posts").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete post: ${error.message}`)
    }
  }

  async getUserByEmail(email: string): Promise<BlogUser | null> {
    const { data, error } = await this.client
      .from("blog_users")
      .select("*")
      .eq("email", email)
      .eq("is_active", true)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return null // User not found
      }
      throw new Error(`Failed to fetch user: ${error.message}`)
    }

    return data
  }

  async createUser(user: Omit<BlogUser, "id" | "created_at" | "updated_at">): Promise<BlogUser> {
    const { data, error } = await this.client.from("blog_users").insert(user).select().single()

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }

    return data
  }

  async updateUser(id: string, updates: Partial<BlogUser>): Promise<BlogUser> {
    const { data, error } = await this.client.from("blog_users").update(updates).eq("id", id).select().single()

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`)
    }

    return data
  }
}

export const blogDb = new BlogDatabase()
