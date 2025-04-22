"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "./logo"
import { useAuth } from "@/context/auth-context" // Import the authentication context

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useAuth() // Get the user from the context

  return (
    <nav className="py-4 px-6 bg-[#473C38]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-display text-2xl font-bold">
          <Logo />
        </Link>

        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className={`text-white hover:text-[#F8F3ED]/80 transition-colors ${
              pathname === "/" ? "font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/cart"
            className={`text-white hover:text-[#F8F3ED]/80 transition-colors ${
              pathname === "/cart" ? "font-semibold" : ""
            }`}
          >
            Cart
          </Link>
          <Link
            href="/about"
            className={`text-white hover:text-[#F8F3ED]/80 transition-colors ${
              pathname === "/about" ? "font-semibold" : ""
            }`}
          >
            About
          </Link>

          {user ? (
            <Link
              href="/profile"
              className="text-cream-light hover:text-cream-medium transition-colors"
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-cream-light hover:text-cream-medium transition-colors"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
