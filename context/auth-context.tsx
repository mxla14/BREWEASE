"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  email: string
  username?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("brewease-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation (in a real app, this would be handled by the backend)
    if (email === "demo@example.com" && password === "password") {
      const user = { id: "user-1", email, username: "Demo User" }
      setUser(user)
      localStorage.setItem("brewease-user", JSON.stringify(user))
      return { error: null }
    }

    // Check if user exists in localStorage (for users who signed up)
    const savedUsers = JSON.parse(localStorage.getItem("brewease-users") || "[]")
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const user = { id: foundUser.id, email: foundUser.email, username: foundUser.username }
      setUser(user)
      localStorage.setItem("brewease-user", JSON.stringify(user))
      return { error: null }
    }

    return { error: { message: "Invalid email or password" } }
  }

  const signUp = async (email: string, password: string, username: string) => {
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    const savedUsers = JSON.parse(localStorage.getItem("brewease-users") || "[]")
    if (savedUsers.some((u: any) => u.email === email)) {
      return { error: { message: "Email already in use" } }
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password, // In a real app, this would be hashed
      username,
    }

    // Save to localStorage
    localStorage.setItem("brewease-users", JSON.stringify([...savedUsers, newUser]))

    return { error: null }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("brewease-user")
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
