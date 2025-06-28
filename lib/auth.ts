import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { blogDb, type BlogUser } from "./supabase"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export interface UserSession {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
}

export interface AuthResult {
  success: boolean
  user?: BlogUser
  error?: string
}

export class AuthService {
  static async authenticate(email: string, password: string): Promise<AuthResult> {
    try {
      const user = await blogDb.getUserByEmail(email)

      if (!user) {
        return { success: false, error: "Usuario no encontrado" }
      }

      if (!user.is_active) {
        return { success: false, error: "Usuario inactivo" }
      }

      // For demo purposes, we'll use simple password comparison
      // In production, use proper bcrypt comparison
      const validPassword = await this.verifyPassword(password, user.password_hash, email)

      if (!validPassword) {
        return { success: false, error: "Contraseña incorrecta" }
      }

      return { success: true, user }
    } catch (error) {
      console.error("Authentication error:", error)
      return { success: false, error: "Error de autenticación" }
    }
  }

  private static async verifyPassword(password: string, hash: string, email: string): Promise<boolean> {
    // Demo password verification - replace with proper bcrypt in production
    const demoPasswords: Record<string, string> = {
      "info@gcmasesores.io": "GCMAsesores2025@!*",
      "editor@gcmasesores.io": "Editor2025@!*",
    }

    if (demoPasswords[email]) {
      return password === demoPasswords[email]
    }

    // Fallback to bcrypt for other users
    try {
      return await bcrypt.compare(password, hash)
    } catch (error) {
      console.error("Password verification error:", error)
      return false
    }
  }

  static generateToken(user: BlogUser): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )
  }

  static verifyToken(token: string): UserSession | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name || "",
        role: decoded.role,
        isActive: true,
      }
    } catch (error) {
      return null
    }
  }

  static hasEditorAccess(user: BlogUser): boolean {
    return ["admin", "editor"].includes(user.role)
  }

  static hasAdminAccess(user: BlogUser): boolean {
    return user.role === "admin"
  }
}

export class SessionManager {
  private static readonly SESSION_KEY = "blog_session"

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

  static getSession(): UserSession | null {
    if (typeof window !== "undefined") {
      const sessionData = localStorage.getItem(this.SESSION_KEY)
      if (sessionData) {
        try {
          return JSON.parse(sessionData)
        } catch (error) {
          this.clearSession()
          return null
        }
      }
    }
    return null
  }

  static clearSession(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  static isAuthenticated(): boolean {
    return this.getSession() !== null
  }

  static hasEditorAccess(): boolean {
    const session = this.getSession()
    return session ? ["admin", "editor"].includes(session.role) : false
  }

  static hasAdminAccess(): boolean {
    const session = this.getSession()
    return session ? session.role === "admin" : false
  }
}
