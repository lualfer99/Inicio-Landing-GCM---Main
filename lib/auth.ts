import { BlogDatabase, type BlogUser } from "./supabase"

// Simple password verification for demo purposes
// In production, use proper bcrypt verification on server-side
const DEMO_PASSWORDS = {
  "info@gcmasesores.io": "GCMAsesores2025@!*",
  "editor@gcmasesores.io": "Editor2025@!*",
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
    const user = await BlogDatabase.getUserByEmail(email)

    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }

    // Verify password (demo implementation)
    const expectedPassword = DEMO_PASSWORDS[email as keyof typeof DEMO_PASSWORDS]
    if (!expectedPassword || password !== expectedPassword) {
      return { success: false, error: "Invalid credentials" }
    }

    // Check if user has admin/editor access
    if (!BlogDatabase.hasAdminAccess(user.role)) {
      return { success: false, error: "Access denied. Admin or Editor role required." }
    }

    return { success: true, user }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed" }
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("blog_user") !== null
}

export function getCurrentUser(): BlogUser | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("blog_user")
  return userStr ? JSON.parse(userStr) : null
}

export function hasAdminAccess(user: BlogUser | null): boolean {
  return user ? BlogDatabase.hasAdminAccess(user.role) : false
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("blog_user")
  }
}

// Role-based authorization middleware
export function requireAuth(requiredRole?: "admin" | "editor"): boolean {
  const user = getCurrentUser()

  if (!user) return false

  if (requiredRole) {
    if (requiredRole === "admin" && user.role !== "admin") return false
    if (requiredRole === "editor" && !["admin", "editor"].includes(user.role)) return false
  }

  return true
}
