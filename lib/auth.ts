import bcrypt from "bcryptjs"
import { BlogDatabase, type BlogUser } from "./supabase"

export interface AuthResult {
  success: boolean
  user?: BlogUser
  error?: string
}

export class AuthService {
  // Hash password for storage
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  }

  // Verify password against hash
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash)
    } catch (error) {
      console.error("Password verification error:", error)
      return false
    }
  }

  // Authenticate user with email and password
  static async authenticate(email: string, password: string): Promise<AuthResult> {
    try {
      // Get user from database
      const user = await BlogDatabase.getUserByEmail(email)

      if (!user) {
        return { success: false, error: "Usuario no encontrado" }
      }

      if (!user.is_active) {
        return { success: false, error: "Cuenta desactivada" }
      }

      // For demo purposes, we'll use simple password comparison
      // In production, you should use proper password hashing
      const validPasswords: Record<string, string> = {
        "info@gcmasesores.io": "GCMAsesores2025@!*",
        "editor@gcmasesores.io": "Editor2025@!*",
        "test@gcmasesores.io": "Test2025@!*",
      }

      const expectedPassword = validPasswords[email]
      if (!expectedPassword || password !== expectedPassword) {
        return { success: false, error: "Credenciales inválidas" }
      }

      return { success: true, user }
    } catch (error) {
      console.error("Authentication error:", error)
      return { success: false, error: "Error de autenticación" }
    }
  }

  // Check if user has admin privileges
  static hasAdminAccess(user: BlogUser): boolean {
    return user.role === "admin"
  }

  // Check if user has editor privileges
  static hasEditorAccess(user: BlogUser): boolean {
    return ["admin", "editor"].includes(user.role)
  }

  // Check if user can edit specific content
  static canEditContent(user: BlogUser, authorId?: string): boolean {
    if (user.role === "admin") return true
    if (user.role === "editor" && authorId === user.id) return true
    return false
  }
}

// Session management utilities
export interface UserSession {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
}

export class SessionManager {
  private static readonly SESSION_KEY = "blog_user_session"

  // Store user session (client-side)
  static setSession(user: BlogUser): void {
    if (typeof window !== "undefined") {
      const session: UserSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.is_active,
      }
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    }
  }

  // Get user session (client-side)
  static getSession(): UserSession | null {
    if (typeof window !== "undefined") {
      const sessionData = localStorage.getItem(this.SESSION_KEY)
      if (sessionData) {
        try {
          return JSON.parse(sessionData)
        } catch (error) {
          console.error("Error parsing session data:", error)
          this.clearSession()
        }
      }
    }
    return null
  }

  // Clear user session
  static clearSession(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const session = this.getSession()
    return session !== null && session.isActive
  }

  // Check if current user has admin access
  static hasAdminAccess(): boolean {
    const session = this.getSession()
    return session?.role === "admin" || false
  }

  // Check if current user has editor access
  static hasEditorAccess(): boolean {
    const session = this.getSession()
    return ["admin", "editor"].includes(session?.role || "") || false
  }
}
