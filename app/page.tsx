"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { coffeeProducts } from "@/data/products"
import BeanBot from "@/components/bean-bot"
import Navbar from "@/components/navbar"
import { useAuth } from "@/context/auth-context"

export default function Home() {
  const [isBeanBotOpen, setIsBeanBotOpen] = useState(false)
  const { user } = useAuth()

  // Get the first three coffee products for the featured section
  const featuredCoffees = coffeeProducts.slice(0, 3)

  return (
    <main className="min-h-screen flex flex-col">
      {/* Use the Navbar component */}
      <Navbar />

      {/* Hero Section with Coffee Images */}
      <section className="relative py-16 px-6 overflow-hidden bg-[#473C38]">
        {/* Left coffee cup image */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 h-full">
          <Image
            src="/images/coffee-cup.png"
            alt="Coffee cup"
            fill
            className="object-contain object-left opacity-80"
            priority
          />
        </div>

        {/* Right croissant image */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-full">
          <Image src="/images/image-Photoroom.png" alt="Croissant" fill className="object-contain object-right" priority />
        </div>

        {/* Hero content */}
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
            Your go-to app for better brews and café convenience — all in one tap.
          </h1>
          <p className="text-lg mb-8 text-white/80">Brew smarter. Order faster. Enjoy More.</p>
          <div className="flex justify-center">
            <Link
              href="/menu"
              className="bg-[#7E3D1B] text-white text-lg px-8 py-3 rounded-md inline-block border border-[#F8F3ED] hover:bg-[#7E3D1B]/90 transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Drinks Section */}
      <section className="py-8 px-6 bg-[#F8F3ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-[#301F0E] mb-6">Drinks</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCoffees.map((coffee) => (
              <Link
                href={`/product/${coffee.id}`}
                key={coffee.id}
                className="bg-[#654438] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="relative h-40 mb-3">
                    <Image src={coffee.image || "/placeholder.svg"} alt={coffee.name} fill className="object-contain" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-display text-xl font-bold text-[#F8F3ED]">{coffee.name}</h3>
                    <p className="text-[#F8F3ED]/70 text-sm mb-2">{coffee.description}</p>
                    <p className="text-[#F8F3ED] font-bold">PHP {coffee.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BeanBot Button */}
      <button
        onClick={() => setIsBeanBotOpen(true)}
        className="fixed bottom-6 right-6 bg-[#7E3D1B] text-white rounded-full p-4 shadow-lg hover:bg-[#7E3D1B]/90 transition-colors z-50"
        aria-label="Open BeanBot"
      >
        <MessageCircle size={24} />
      </button>

      {/* BeanBot Dialog */}
      <BeanBot isOpen={isBeanBotOpen} onClose={() => setIsBeanBotOpen(false)} />
    </main>
  )
}
