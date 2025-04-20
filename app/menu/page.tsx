"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { coffeeProducts } from "@/data/products"
import { Search } from "lucide-react"
import Navbar from "@/components/navbar"

type Category = "all" | "coffee" | "non-coffee" | "chocolate" | "pastries"

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const filteredProducts = coffeeProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || product.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen flex flex-col bg-[#F8F3ED]">
      <Navbar />

      {/* Search Bar and Categories */}
      <div className="bg-[#F8F3ED] py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="font-display text-2xl font-bold text-[#301F0E] mb-4 md:mb-0">Drinks</h2>

            <div className="w-full md:w-auto">
              <div className="relative mb-4 md:mb-0 max-w-md">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white text-[#301F0E] placeholder-[#301F0E]/50 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-1 focus:ring-[#7E3D1B]"
                />
                <Search className="absolute left-3 top-2.5 text-[#301F0E]/50 h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <CategoryButton label="All" active={activeCategory === "all"} onClick={() => setActiveCategory("all")} />
            <CategoryButton
              label="Coffee"
              active={activeCategory === "coffee"}
              onClick={() => setActiveCategory("coffee")}
            />
            <CategoryButton
              label="Non Coffee"
              active={activeCategory === "non-coffee"}
              onClick={() => setActiveCategory("non-coffee")}
            />
            <CategoryButton
              label="Chocolate"
              active={activeCategory === "chocolate"}
              onClick={() => setActiveCategory("chocolate")}
            />
            <CategoryButton
              label="Pastries"
              active={activeCategory === "pastries"}
              onClick={() => setActiveCategory("pastries")}
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="bg-[#F8F3ED] py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="bg-[#654438] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="relative h-40 mb-3 flex items-center justify-center">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-display text-xl font-bold text-[#F8F3ED]">{product.name}</h3>
                    <p className="text-[#F8F3ED]/70 text-sm mb-2">{product.description}</p>
                    <p className="text-[#F8F3ED] font-bold">PHP {product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#301F0E] text-lg">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        active ? "bg-[#7E3D1B] text-white" : "bg-white text-[#301F0E] hover:bg-[#F8F3ED]/80"
      }`}
    >
      {label}
    </button>
  )
}
