"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Image from "next/image"
import { coffeeProducts } from "@/data/products"
import { useCart } from "@/context/cart-context"
import { MessageCircle, Minus, Plus } from "lucide-react"
import BeanBot from "@/components/bean-bot"

type Size = "Small" | "Medium" | "Large"

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [isBeanBotOpen, setIsBeanBotOpen] = useState(false)

  const [selectedSize, setSelectedSize] = useState<Size>("Medium")
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")

  const product = coffeeProducts.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F3ED]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-[#301F0E] text-xl">Product not found</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      notes,
      image: product.image,
    })

    router.push("/cart")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3ED]">
      <Navbar />

      <main className="flex-grow py-8 px-6 md:px-12">
        <h1 className="text-[#301F0E] text-3xl font-bold mb-6">Details</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image - Fixed sizing to match the second image */}
          <div className="md:w-1/3">
            <div className="bg-[#654438] rounded-lg overflow-hidden p-4 flex items-center justify-center h-80">
              <div className="relative w-full h-full">
                <Image
                  src={product.image || "/images/coffee-cup.png"}
                  alt={product.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="p-2"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-2/3">
            <h2 className="font-display text-3xl font-bold text-[#301F0E] mb-2">{product.name}</h2>
            <p className="text-[#301F0E] mb-6">{product.details}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-[#301F0E] text-xl mb-2">Size</h3>
              <div className="flex space-x-4">
                <SizeButton size="Small" selected={selectedSize === "Small"} onClick={() => setSelectedSize("Small")} />
                <SizeButton
                  size="Medium"
                  selected={selectedSize === "Medium"}
                  onClick={() => setSelectedSize("Medium")}
                />
                <SizeButton size="Large" selected={selectedSize === "Large"} onClick={() => setSelectedSize("Large")} />
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-[#301F0E] text-xl mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-[#7E3D1B] text-white p-2 rounded-l-md hover:bg-[#7E3D1B]/80 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="bg-white border border-[#7E3D1B] text-[#301F0E] px-4 py-2 text-center min-w-[3rem]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-[#7E3D1B] text-white p-2 rounded-r-md hover:bg-[#7E3D1B]/80 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Notes to Barista */}
            <div className="mb-8">
              <h3 className="text-[#301F0E] text-xl mb-2">Notes to Barista:</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white text-[#301F0E] border border-[#7E3D1B] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#7E3D1B]"
                rows={2}
                placeholder="Any special requests?"
              />
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddToCart}
                className="bg-[#7E3D1B] text-white py-3 px-8 rounded-md hover:bg-[#7E3D1B]/80 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* BeanBot Button */}
      <button
        onClick={() => setIsBeanBotOpen(true)}
        className="fixed bottom-6 right-6 bg-[#7E3D1B] text-white rounded-full p-4 shadow-lg hover:bg-[#7E3D1B]/80 transition-colors z-50"
        aria-label="Open BeanBot"
      >
        <MessageCircle size={24} />
      </button>

      {/* BeanBot Dialog */}
      <BeanBot isOpen={isBeanBotOpen} onClose={() => setIsBeanBotOpen(false)} />
    </div>
  )
}

function SizeButton({
  size,
  selected,
  onClick,
}: {
  size: Size
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-md border transition-colors ${
        selected ? "bg-[#7E3D1B] text-white border-[#F8F3ED]" : "bg-transparent text-[#301F0E] border-[#301F0E]"
      }`}
    >
      {size}
    </button>
  )
}
