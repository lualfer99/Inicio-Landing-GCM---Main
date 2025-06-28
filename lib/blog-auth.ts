import { supabase } from "./supabase"
import bcrypt from "bcryptjs"

export async function loginUser(email: string, password: string) {
  try {
    // Get user from database
    const { data: user, error } = await supabase.from("blog_users").select("*").eq("email", email).single()

    if (error || !user) {
      return { success: false, error: "Invalid credentials" }
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash)

    if (!isValid) {
      return { success: false, error: "Invalid credentials" }
    }

    return { success: true, user }
  } catch (error) {
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
