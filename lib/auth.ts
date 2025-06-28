import bcrypt from "bcryptjs"
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
    const { data, error } = await supabase.from("blog_users").select("*").eq("email", email).single()

    if (error || !data) {
      return { success: false, error: "Invalid credentials" }
    }

    const isValidPassword = await bcrypt.compare(password, data.password_hash)

    if (!isValidPassword) {
      return { success: false, error: "Invalid credentials" }
    }

    // Remove password_hash from returned user
    const { password_hash, ...user } = data
    return { success: true, user: user as BlogUser }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed" }
  }
}

export async function createUser(
  email: string,
  name: string,
  password: string,
  role: "admin" | "editor" = "editor",
): Promise<{ success: boolean; user?: BlogUser; error?: string }> {
  try {
    const saltRounds = 12
    const password_hash = await bcrypt.hash(password, saltRounds)

    const { data, error } = await supabase
      .from("blog_users")
      .insert({
        email,
        name,
        password_hash,
        role,
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    // Remove password_hash from returned user
    const { password_hash: _, ...user } = data
    return { success: true, user: user as BlogUser }
  } catch (error: any) {
    console.error("Create user error:", error)
    return { success: false, error: error.message || "Failed to create user" }
  }
}
