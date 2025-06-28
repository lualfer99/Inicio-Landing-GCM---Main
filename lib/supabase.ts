import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://supabase.gcmasesores.io'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTEwNzAzMTcsImV4cCI6MTg5MzQ1NjAwMCwiaXNzIjoiZG9rcGxveSJ9.WUIOIlJgOItFNEJegGaBAhmNLZxUOLqOFB0V28BXmYo'

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
