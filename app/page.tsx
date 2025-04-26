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
    <div className="min-h-screen bg-[#F9F5F1]">
      {/* Use the Navbar component */}
      <Navbar />
      
      {/* Hero Section with Coffee Images */}
      <section className="relative py-16 px-4 md:px-8 lg:px-12">
        {/* Left coffee cup image */}
        <div className="absolute left-4 top-24 hidden md:block">
          <div className="rounded-xl overflow-hidden w-64 h-64 shadow-md"> {/* Added rounded-xl (12px) and adjusted size */}
            <Image 
              src="/images/coffee-cup.jpg" 
              alt="Coffee cup" 
              width={256} 
              height={256}
              className="object-cover w-full h-full" 
            />
          </div>
        </div>
        
        {/* Right croissant image */}
        <div className="absolute right-4 top-32 hidden md:block">
          <div className="rounded-xl overflow-hidden w-64 h-64 shadow-md"> {/* Added rounded-xl (12px) and adjusted size */}
            <Image 
              src="/images/croissant.jpg" 
              alt="Croissant" 
              width={256} 
              height={256}
              className="object-cover w-full h-full" 
            />
          </div>
        </div>
        
        {/* Hero content */}
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3A2A1D] mb-6">
            Your go-to app for better brews and café convenience — all in one tap.
          </h1>
          <p className="text-xl md:text-2xl text-[#5D4C3C] mb-8">
            Brew smarter. Order faster. Enjoy More.
          </p>
          <Link href="/order" className="bg-[#7E3D1B] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#6A321A] transition-colors">
            Order Now
          </Link>
        </div>
      </section>
      
      {/* Drinks Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#3A2A1D] mb-12">
            Drinks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCoffees.map((coffee) => (
              <div key={coffee.id} className="bg-[#F9F5F1] rounded-xl overflow-hidden shadow-md">
                <div className="rounded-xl overflow-hidden h-64 w-full"> {/* Added rounded-xl (12px) */}
                  <Image
                    src={coffee.image}
                    alt={coffee.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#3A2A1D] mb-2">
                    {coffee.name}
                  </h3>
                  <p className="text-[#5D4C3C] mb-4">
                    {coffee.description}
                  </p>
                  <p className="text-[#7E3D1B] font-bold">
                    PHP {coffee.price}
                  </p>
                </div>
              </div>
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
      {isBeanBotOpen && (
        <BeanBot onClose={() => setIsBeanBotOpen(false)} />
      )}
    </div>
  )
}
