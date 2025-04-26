"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, MessageCircle, Trash2 } from "lucide-react"
import Navbar from "@/components/navbar"
import { useCart } from "@/context/cart-context"
import BeanBot from "@/components/bean-bot"

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBeanBotOpen, setIsBeanBotOpen] = useState(false)

  const handlePlaceOrder = () => {
    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true)
      setIsSubmitting(false)

      // Clear cart after order is "processed"
      setTimeout(() => {
        clearCart()
      }, 2000)
    }, 1500)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F3ED]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-[#7E3D1B] rounded-lg p-8 max-w-md w-full text-center">
            <h1 className="font-display text-2xl font-bold text-[#F8F3ED] mb-4">Order Placed!</h1>
            <p className="text-[#F8F3ED]/80 mb-6">
              Your order has been successfully placed. Thank you for using BrewEase!
            </p>
            <Link
              href="/menu"
              className="bg-[#654438] text-[#F8F3ED] py-2 px-6 rounded-md border border-[#F8F3ED] inline-block hover:bg-[#654438]/90 transition-colors"
            >
              Order More
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F3ED]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-[#7E3D1B] rounded-lg p-8 max-w-md w-full text-center">
            <h1 className="font-display text-2xl font-bold text-[#F8F3ED] mb-4">Your Cart is Empty</h1>
            <p className="text-[#F8F3ED]/80 mb-6">Add some delicious coffee to your cart!</p>
            <Link
              href="/menu"
              className="bg-[#654438] text-[#F8F3ED] py-2 px-6 rounded-md border border-[#F8F3ED] inline-block hover:bg-[#654438]/90 transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3ED]">
      <Navbar />

      <main className="flex-grow py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl font-bold text-[#301F0E] mb-8">Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="bg-[#654438] rounded-lg p-4 flex flex-col sm:flex-row">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image || "/images/coffee-cup.png"}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-display text-xl font-bold text-[#F8F3ED]">{item.name}</h3>
                        <p className="text-[#F8F3ED]/80 text-sm">Size: {item.size}</p>
                        <p className="text-[#F8F3ED] text-sm">Price: PHP {item.price}</p>
                        
                        {/* Added special requests/notes display */}
                        {item.notes && (
                          <div className="mt-2">
                            <p className="text-[#F8F3ED]/80 text-sm">Special Request:</p>
                            <p className="text-[#F8F3ED] text-sm italic">"{item.notes}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 sm:mt-0 space-x-2">
                    <div className="flex items-center mr-4">
                      <span className="text-[#F8F3ED] mr-2">Qty:</span>
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="bg-[#301F0E]/30 text-[#F8F3ED] p-1 rounded-md hover:bg-[#301F0E]/50 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="bg-[#301F0E]/20 text-[#F8F3ED] px-3 py-1 rounded-md min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-[#301F0E]/30 text-[#F8F3ED] p-1 rounded-md hover:bg-[#301F0E]/50 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    {/* Added remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-[#301F0E]/30 text-[#F8F3ED] p-2 rounded-md hover:bg-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#7E3D1B] rounded-lg p-6 sticky top-4">
                <h2 className="font-display text-2xl font-bold text-[#F8F3ED] mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-summary`} className="flex justify-between">
                      <div className="text-[#F8F3ED]">
                        {item.name} x{item.quantity}
                        <div className="text-[#F8F3ED]/70 text-sm">Size: {item.size}</div>
                      </div>
                      <div className="text-[#F8F3ED]">
                        PHP {item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#F8F3ED]/30 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-[#F8F3ED]">Sub Total</span>
                    <span className="text-[#F8F3ED]">PHP {totalPrice}</span>
                  </div>
                  <div className="text-[#F8F3ED]/70 text-sm mt-1">
                    Items in Cart: {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-[#654438] text-[#F8F3ED] py-3 rounded-md border border-[#F8F3ED] hover:bg-[#654438]/90 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </button>

                  <Link
                    href="/menu"
                    className="bg-[#654438] text-[#F8F3ED] py-3 rounded-md border border-[#F8F3ED] text-center hover:bg-[#654438]/90 transition-colors"
                  >
                    Add more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BeanBot Button */}
      <button
        onClick={() => setIsBeanBotOpen(true)}
        className="fixed bottom-6 right-6 bg-[#7E3D1B] text-[#F8F3ED] rounded-full p-4 shadow-lg hover:bg-[#7E3D1B]/90 transition-colors z-50"
        aria-label="Open BeanBot"
      >
        <MessageCircle size={24} />
      </button>

      {/* BeanBot Dialog */}
      <BeanBot isOpen={isBeanBotOpen} onClose={() => setIsBeanBotOpen(false)} />
    </div>
  )
}
