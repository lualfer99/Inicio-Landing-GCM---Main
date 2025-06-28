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
