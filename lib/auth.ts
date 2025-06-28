import { blogDb, type BlogUser } from "./supabase"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export interface AuthSession {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export async function hashPassword(password: string): Promise<string> {
  // In a real application, use bcrypt or similar
  // For demo purposes, we'll use a simple hash
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Demo password verification - in production use bcrypt.compare()
  const testHash = await hashPassword(password)

  // For demo users, check against known passwords
  const demoPasswords: Record<string, string> = {
    "info@gcmasesores.io": "GCMAsesores2025@!*",
    "editor@gcmasesores.io": "Editor2025@!*",
    "test@gcmasesores.io": "Test2025@!*",
  }

  // Check if this is a demo password
  for (const [email, demoPassword] of Object.entries(demoPasswords)) {
    if (password === demoPassword) {
      return true
    }
  }

  return testHash === hash
}

export async function authenticate(email: string, password: string): Promise<BlogUser | null> {
  try {
    const user = await blogDb.getUserByEmail(email)
    if (!user) {
      return null
    }

    const isValid = await verifyPassword(password, user.password_hash)
    if (!isValid) {
      return null
    }

    return user
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function createSession(user: BlogUser): Promise<string> {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  return token
}

export async function getSession(): Promise<AuthSession | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as AuthSession
  } catch (error) {
    console.error("Session verification error:", error)
    return null
  }
}

export async function requireAuth(): Promise<AuthSession> {
  const session = await getSession()
  if (!session) {
    throw new Error("Authentication required")
  }
  return session
}

export async function requireRole(allowedRoles: string[]): Promise<AuthSession> {
  const session = await requireAuth()
  if (!allowedRoles.includes(session.user.role)) {
    throw new Error("Insufficient permissions")
  }
  return session
}

export async function logout(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}
