"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { coffeeProducts } from "@/data/products"
import { Send, X } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type BeanBotProps = {
  isOpen: boolean
  onClose: () => void
}

export default function BeanBot({ isOpen, onClose }: BeanBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm BeanBot, your coffee assistant. How can I help you today? I can recommend coffee based on your preferences or answer questions about our menu.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate a delay for the bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(input, messages)
      setMessages((prev) => [...prev, { role: "assistant", content: botResponse.message }])

      // If the bot suggested adding a product to cart
      if (botResponse.addToCart) {
        addToCart({
          id: botResponse.product.id,
          name: botResponse.product.name,
          price: botResponse.product.price,
          size: "Medium",
          quantity: 1,
          notes: "Added via BeanBot",
          image: botResponse.product.image,
        })
      }

      setIsLoading(false)
    }, 1000)
  }

  // Simple bot response generator
  const generateBotResponse = (userInput: string, messageHistory: Message[]) => {
    const input = userInput.toLowerCase()

    // Check for recommendation requests
    if (input.includes("recommend") || input.includes("suggestion") || input.includes("what should i")) {
      const randomProduct = coffeeProducts[Math.floor(Math.random() * coffeeProducts.length)]
      return {
        message: `I'd recommend trying our ${randomProduct.name}. It's ${randomProduct.description} and quite popular! Would you like me to add it to your cart?`,
        addToCart: false,
        product: null,
      }
    }

    // Check for agreement to add to cart
    if (
      messageHistory.length > 1 &&
      messageHistory[messageHistory.length - 2].role === "assistant" &&
      messageHistory[messageHistory.length - 2].content.includes("Would you like me to add it to your cart") &&
      (input.includes("yes") || input.includes("sure") || input.includes("ok"))
    ) {
      // Extract the product from previous message
      const prevMessage = messageHistory[messageHistory.length - 2].content
      const productNameMatch = prevMessage.match(/our ([^.]+)\./)

      if (productNameMatch) {
        const productName = productNameMatch[1]
        const product = coffeeProducts.find((p) => p.name === productName)

        if (product) {
          return {
            message: `Great! I've added a ${product.name} to your cart. Anything else I can help with?`,
            addToCart: true,
            product: product,
          }
        }
      }
    }

    // Coffee-related questions
    if (input.includes("coffee")) {
      return {
        message: `We have several great coffee options! Our most popular are the Caffe Mocha, Spanish Latte, and Caffe Latte. Would you like a recommendation?`,
        addToCart: false,
        product: null,
      }
    }

    // Questions about sizes
    if (input.includes("size") || input.includes("sizes")) {
      return {
        message: `We offer three sizes for our drinks: Small, Medium, and Large. Medium is our most popular size!`,
        addToCart: false,
        product: null,
      }
    }

    // Questions about prices
    if (input.includes("price") || input.includes("cost") || input.includes("how much")) {
      return {
        message: `Our coffee prices range from PHP 90 to PHP 130 depending on the type and size. Our specialty drinks like Caffe Mocha and Spanish Latte are PHP 120.`,
        addToCart: false,
        product: null,
      }
    }

    // Fallback response
    return {
      message: `I'm here to help with coffee-related questions and recommendations. Can I suggest something from our menu?`,
      addToCart: false,
      product: null,
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#301F0E]/50">
      <div className="bg-[#F8F3ED] rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#7E3D1B] text-[#F8F3ED] p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="font-display text-xl font-bold">BeanBot</h2>
          <button onClick={onClose} className="text-[#F8F3ED]/80 hover:text-[#F8F3ED] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-[#7E3D1B] text-[#F8F3ED]" : "bg-[#654438]/20 text-[#301F0E]"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#654438]/20 text-[#301F0E] rounded-lg p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#7E3D1B] animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#7E3D1B] animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#7E3D1B] animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[#301F0E]/20">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask BeanBot about coffee..."
              className="flex-grow bg-white text-[#301F0E] border border-[#301F0E]/30 rounded-l-md p-3 focus:outline-none focus:ring-2 focus:ring-[#7E3D1B]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#7E3D1B] text-[#F8F3ED] p-3 rounded-r-md hover:bg-[#7E3D1B]/90 transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
