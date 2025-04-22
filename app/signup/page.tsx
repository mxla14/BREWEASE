"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signUp(email, password, username)
      if (error) {
        setError(error.message)
      } else {
        router.push("/login?registered=true")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Coffee beans background with logo */}
      <div className="md:w-1/2 bg-[#301f0e] relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="public/images/signup.jpg"
            alt="Coffee beans"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-4">
              <Image
                src="public/images/signup.jpg"
                alt="Coffee cup with latte art"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h1 className="font-display text-4xl font-bold text-[#f8f3ed] bg-[#301f0e]/50 px-4 py-2 rounded-md">
              BrewEase
            </h1>
          </div>
        </div>
      </div>

      {/* Right side - Sign up form */}
      <div className="md:w-1/2 bg-[#7e3d1b] p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-[#301f0e]/80 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-[#f8f3ed]">BrewEase Sign Up</h2>
            <p className="text-[#f8f3ed]/80 mt-2">Create an account to start your coffee journey</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-[#f8f3ed] mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#473c38] text-[#f8f3ed] border border-[#f8f3ed]/30 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#f8f3ed]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#f8f3ed] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#473c38] text-[#f8f3ed] border border-[#f8f3ed]/30 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#f8f3ed]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#f8f3ed] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#473c38] text-[#f8f3ed] border border-[#f8f3ed]/30 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#f8f3ed]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-[#f8f3ed]/70"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-[#f8f3ed] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-[#473c38] text-[#f8f3ed] border border-[#f8f3ed]/30 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#f8f3ed]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-[#f8f3ed]/70"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7e3d1b] text-[#f8f3ed] py-3 rounded-md hover:bg-[#7e3d1b]/80 transition-colors mt-6"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[#f8f3ed]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#f8f3ed] underline hover:text-[#f8f3ed]/80">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
