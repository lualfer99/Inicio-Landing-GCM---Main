import { supabase } from "./supabase-blog"
import bcrypt from "bcryptjs"

export interface BlogUser {
  id: string
  email: string
  name: string
  created_at: string
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{
  success: boolean
  user?: BlogUser
  error?: string
}> {
  try {
    // Get user from database
    const { data: user, error } = await supabase.from("blog_users").select("*").eq("email", email).single()

    if (error || !user) {
      return { success: false, error: "Invalid credentials" }
    }

    // Check if password_hash exists
    if (!user.password_hash) {
      return { success: false, error: "Account not properly configured" }
    }

    // Verify password using bcrypt
    const isValid = await bcrypt.compare(password, user.password_hash)

    if (!isValid) {
      return { success: false, error: "Invalid credentials" }
    }

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed" }
  }
}

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

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Helper function to verify if a user is authenticated (for client-side)
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("blog_user") !== null
}

// Helper function to get current user from localStorage
export function getCurrentUser(): BlogUser | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("blog_user")
  return userStr ? JSON.parse(userStr) : null
}

// Helper function to logout
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("blog_user")
  }
}
