"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
      } else {
        router.push("/")
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
      {/* Left side - Background with signup image */}
      <div className="md:w-1/2 bg-[#301f0e] relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/signup.jpg"
            alt="Coffee beans"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="font-poppins text-4xl font-bold text-[#7E3D1B] bg-[#F8F3ED]/50 px-4 py-2 rounded-md absolute bottom-10 left-1/2 transform -translate-x-1/2 border-2 border-[#F8F3ED]">
          BrewEase
        </h1>
      </div>

      {/* Right side - Login form */}
      <div className="md:w-1/2 bg-[#7e3d1b] p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-[#301f0e]/80 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="font-poppins text-3xl font-bold text-[#f8f3ed]">BrewEase Log In</h2>
            <p className="text-[#f8f3ed]/80 mt-2">Welcome Back, please login to your account</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="block text-[#f8f3ed]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[#f8f3ed]/70 hover:text-[#f8f3ed] text-sm">
                  Forgot Password?
                </Link>
              </div>
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
              <div className="flex justify-end mt-1">
                <span className="text-[#f8f3ed]/70 text-sm">Show Password</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7e3d1b] text-[#f8f3ed] py-3 rounded-md hover:bg-[#7e3d1b]/80 transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[#f8f3ed]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#f8f3ed] underline hover:text-[#f8f3ed]/80">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
