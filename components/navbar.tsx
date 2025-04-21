"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "./logo"

export default function Navbar() {
  const pathname = usePathname()

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
          <Link
            href="/login"
            className={`text-white hover:text-[#F8F3ED]/80 transition-colors ${
              pathname === "/login" ? "font-semibold" : ""
            }`}
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  )
}
