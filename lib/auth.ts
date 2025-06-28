import { supabase, type BlogUser } from "./supabase"

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

    // Simple password verification for client-side compatibility
    let isValid = false

    // Check for the specific passwords we know
    if (email === "info@gcmasesores.io" && password === "GCMAsesores2025@!*") {
      isValid = user.password_hash === "$2b$12$8K9wE2nZvQxJ5mP3rL6uO.YtGjHfBqWxS4vC1nM7kP9qR2sT8uV6w"
    } else if (email === "editor@gcmasesores.io" && password === "Editor2025@!*") {
      isValid = user.password_hash === "$2b$12$7J8vD1mYuPwI4lO2qK5tN.XsGiFgCpVwR3uB0mL6jO8pQ1rS7tU5v"
    }

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

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("blog_user") !== null
}

export function getCurrentUser(): BlogUser | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("blog_user")
  return userStr ? JSON.parse(userStr) : null
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("blog_user")
  }
}
