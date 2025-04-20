import type React from "react"
import type { Metadata } from "next"
import { Poppins, Montserrat } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "BrewEase - Your Coffee Ordering App",
  description: "Order coffee with ease and get personalized recommendations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} font-sans bg-[#F8F3ED]`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
