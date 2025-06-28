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
  excerpt?: string
  image_url?: string
  image_urls: string[]
  keywords: string[]
  published: boolean
  featured: boolean
  view_count: number
  reading_time: number
  author_id?: string
  created_at: string
  updated_at: string
  published_at?: string
  author?: {
    id: string
    name: string
    email: string
    role: string
    avatar_url?: string
    bio?: string
  }
  category_names?: string[]
  category_slugs?: string[]
}

export interface BlogUser {
  id: string
  email: string
  name: string
  password_hash: string
  role: "admin" | "editor" | "subscriber"
  is_active: boolean
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  created_at: string
}

export interface SearchResult extends BlogPost {
  rank: number
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
  private cache = new Map<string, { data: any; timestamp: number }>()
  private cacheTimeout = 5 * 60 * 1000 // 5 minutes

  private getCacheKey(method: string, params: any): string {
    return `${method}_${JSON.stringify(params)}`
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data as T
    }
    return null
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  private clearCache(): void {
    this.cache.clear()
  }

  async getPosts(published?: boolean, limit?: number, offset?: number, featured?: boolean): Promise<BlogPost[]> {
    const cacheKey = this.getCacheKey("getPosts", { published, limit, offset, featured })
    const cached = this.getFromCache<BlogPost[]>(cacheKey)
    if (cached) return cached

    try {
      let query = this.client
        .from("blog_posts_with_author")
        .select("*")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })

      if (published !== undefined) {
        query = query.eq("published", published)
      }

      if (featured !== undefined) {
        query = query.eq("featured", featured)
      }

      if (limit) {
        query = query.limit(limit)
      }

      if (offset) {
        query = query.range(offset, offset + (limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) {
        console.error("Database error:", error)
        throw new Error(`Failed to fetch posts: ${error.message}`)
      }

      const posts = (data || []).map(this.transformPost)
      this.setCache(cacheKey, posts)
      return posts
    } catch (error) {
      console.error("Error fetching posts:", error)
      // Fallback to basic query
      return this.getFallbackPosts(published, limit, offset)
    }
  }

  private async getFallbackPosts(published?: boolean, limit?: number, offset?: number): Promise<BlogPost[]> {
    try {
      let query = this.client
        .from("blog_posts")
        .select(`
          *,
          blog_users!blog_posts_author_id_fkey (
            id,
            name,
            email,
            role,
            avatar_url,
            bio
          )
        `)
        .order("created_at", { ascending: false })

      if (published !== undefined) {
        query = query.eq("published", published)
      }

      if (limit) {
        query = query.limit(limit)
      }

      if (offset) {
        query = query.range(offset, offset + (limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) {
        throw new Error(`Fallback query failed: ${error.message}`)
      }

      return (data || []).map(this.transformPost)
    } catch (fallbackError) {
      console.error("Fallback query also failed:", fallbackError)
      return []
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const cacheKey = this.getCacheKey("getPostBySlug", { slug })
    const cached = this.getFromCache<BlogPost | null>(cacheKey)
    if (cached !== undefined) return cached

    try {
      const { data, error } = await this.client.from("blog_posts_with_author").select("*").eq("slug", slug).single()

      if (error) {
        if (error.code === "PGRST116") {
          this.setCache(cacheKey, null)
          return null // Post not found
        }
        throw new Error(`Failed to fetch post: ${error.message}`)
      }

      const post = this.transformPost(data)
      this.setCache(cacheKey, post)

      // Increment view count asynchronously
      this.incrementViewCount(post.id).catch(console.error)

      return post
    } catch (error) {
      console.error("Error fetching post by slug:", error)
      return this.getFallbackPostBySlug(slug)
    }
  }

  private async getFallbackPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await this.client
        .from("blog_posts")
        .select(`
          *,
          blog_users!blog_posts_author_id_fkey (
            id,
            name,
            email,
            role,
            avatar_url,
            bio
          )
        `)
        .eq("slug", slug)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          return null
        }
        throw new Error(`Fallback query failed: ${error.message}`)
      }

      return this.transformPost(data)
    } catch (fallbackError) {
      console.error("Fallback query also failed:", fallbackError)
      return null
    }
  }

  async searchPosts(query: string, limit = 10, offset = 0): Promise<SearchResult[]> {
    const cacheKey = this.getCacheKey("searchPosts", { query, limit, offset })
    const cached = this.getFromCache<SearchResult[]>(cacheKey)
    if (cached) return cached

    try {
      const { data, error } = await this.client.rpc("search_blog_posts", {
        search_query: query,
        limit_count: limit,
        offset_count: offset,
      })

      if (error) {
        throw new Error(`Search failed: ${error.message}`)
      }

      const results = (data || []).map((item: any) => ({
        ...this.transformPost(item),
        rank: item.rank,
      }))

      this.setCache(cacheKey, results)
      return results
    } catch (error) {
      console.error("Error searching posts:", error)
      return []
    }
  }

  async getCategories(): Promise<BlogCategory[]> {
    const cacheKey = this.getCacheKey("getCategories", {})
    const cached = this.getFromCache<BlogCategory[]>(cacheKey)
    if (cached) return cached

    try {
      const { data, error } = await this.client.from("blog_categories").select("*").order("name")

      if (error) {
        throw new Error(`Failed to fetch categories: ${error.message}`)
      }

      this.setCache(cacheKey, data || [])
      return data || []
    } catch (error) {
      console.error("Error fetching categories:", error)
      return []
    }
  }

  async getPostsByCategory(categorySlug: string, limit?: number): Promise<BlogPost[]> {
    const cacheKey = this.getCacheKey("getPostsByCategory", { categorySlug, limit })
    const cached = this.getFromCache<BlogPost[]>(cacheKey)
    if (cached) return cached

    try {
      let query = this.client
        .from("blog_posts_with_author")
        .select("*")
        .eq("published", true)
        .contains("category_slugs", [categorySlug])
        .order("published_at", { ascending: false, nullsFirst: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) {
        throw new Error(`Failed to fetch posts by category: ${error.message}`)
      }

      const posts = (data || []).map(this.transformPost)
      this.setCache(cacheKey, posts)
      return posts
    } catch (error) {
      console.error("Error fetching posts by category:", error)
      return []
    }
  }

  async getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
    return this.getPosts(true, limit, 0, true)
  }

  async getRelatedPosts(postId: string, keywords: string[], limit = 3): Promise<BlogPost[]> {
    const cacheKey = this.getCacheKey("getRelatedPosts", { postId, keywords, limit })
    const cached = this.getFromCache<BlogPost[]>(cacheKey)
    if (cached) return cached

    try {
      const { data, error } = await this.client
        .from("blog_posts_with_author")
        .select("*")
        .eq("published", true)
        .neq("id", postId)
        .overlaps("keywords", keywords)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(limit)

      if (error) {
        throw new Error(`Failed to fetch related posts: ${error.message}`)
      }

      const posts = (data || []).map(this.transformPost)
      this.setCache(cacheKey, posts)
      return posts
    } catch (error) {
      console.error("Error fetching related posts:", error)
      return []
    }
  }

  async createPost(
    post: Omit<BlogPost, "id" | "created_at" | "updated_at" | "view_count" | "reading_time" | "excerpt">,
  ): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    try {
      const { data, error } = await this.client
        .from("blog_posts")
        .insert({
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          image_url: post.image_url,
          image_urls: post.image_urls,
          keywords: post.keywords,
          published: post.published,
          featured: post.featured,
          author_id: post.author_id,
        })
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      this.clearCache()
      return { success: true, data: this.transformPost(data) }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async updatePost(
    id: string,
    updates: Partial<BlogPost>,
  ): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
    try {
      const { data, error } = await this.client
        .from("blog_posts")
        .update({
          title: updates.title,
          slug: updates.slug,
          description: updates.description,
          content: updates.content,
          image_url: updates.image_url,
          image_urls: updates.image_urls,
          keywords: updates.keywords,
          published: updates.published,
          featured: updates.featured,
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      this.clearCache()
      return { success: true, data: this.transformPost(data) }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async deletePost(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.client.from("blog_posts").delete().eq("id", id)

      if (error) {
        return { success: false, error: error.message }
      }

      this.clearCache()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  private async incrementViewCount(postId: string): Promise<void> {
    try {
      await this.client.rpc("increment_view_count", { post_id: postId })
    } catch (error) {
      console.error("Error incrementing view count:", error)
    }
  }

  private transformPost(data: any): BlogPost {
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      excerpt: data.excerpt,
      image_url: data.image_url,
      image_urls: data.image_urls || [],
      keywords: data.keywords || [],
      published: data.published,
      featured: data.featured || false,
      view_count: data.view_count || 0,
      reading_time: data.reading_time || 0,
      author_id: data.author_id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      published_at: data.published_at,
      author: data.author_name
        ? {
            id: data.author_id,
            name: data.author_name,
            email: data.author_email,
            role: data.role || "subscriber",
            avatar_url: data.author_avatar,
            bio: data.author_bio,
          }
        : data.blog_users
          ? {
              id: data.blog_users.id,
              name: data.blog_users.name,
              email: data.blog_users.email,
              role: data.blog_users.role,
              avatar_url: data.blog_users.avatar_url,
              bio: data.blog_users.bio,
            }
          : undefined,
      category_names: data.category_names,
      category_slugs: data.category_slugs,
    }
  }

  async getUserByEmail(email: string): Promise<BlogUser | null> {
    try {
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
    } catch (error) {
      console.error("Error fetching user:", error)
      return null
    }
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

  // Analytics methods
  async getPostStats(): Promise<{
    totalPosts: number
    publishedPosts: number
    draftPosts: number
    totalViews: number
    avgReadingTime: number
  }> {
    try {
      const { data, error } = await this.client.from("blog_posts").select("published, view_count, reading_time")

      if (error) {
        throw new Error(`Failed to fetch post stats: ${error.message}`)
      }

      const stats = data.reduce(
        (acc, post) => {
          acc.totalPosts++
          if (post.published) {
            acc.publishedPosts++
          } else {
            acc.draftPosts++
          }
          acc.totalViews += post.view_count || 0
          acc.totalReadingTime += post.reading_time || 0
          return acc
        },
        {
          totalPosts: 0,
          publishedPosts: 0,
          draftPosts: 0,
          totalViews: 0,
          totalReadingTime: 0,
        },
      )

      return {
        ...stats,
        avgReadingTime: stats.totalPosts > 0 ? Math.round(stats.totalReadingTime / stats.totalPosts) : 0,
      }
    } catch (error) {
      console.error("Error fetching post stats:", error)
      return {
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
        totalViews: 0,
        avgReadingTime: 0,
      }
    }
  }
}

export const blogDb = new BlogDatabase()
