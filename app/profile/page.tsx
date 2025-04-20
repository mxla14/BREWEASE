"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import { fetchUserOrders, type Order } from "@/services/supabase-service"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Profile() {
  const { user, signOut } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=profile")
      return
    }

    const loadOrders = async () => {
      setIsLoading(true)
      try {
        const userOrders = await fetchUserOrders(user.id)
        setOrders(userOrders)
      } catch (error) {
        console.error("Error loading orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [user, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-coffee-light py-8 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-coffee-medium/80 rounded-lg p-6 mb-8">
            <h1 className="font-display text-3xl font-bold text-cream-light mb-4">My Profile</h1>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-coffee-dark/50">
                <div className="absolute inset-0 flex items-center justify-center text-cream-light text-3xl font-bold">
                  {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                </div>
              </div>

              <div>
                <p className="text-cream-light text-lg">
                  <span className="text-cream-light/70">Email:</span> {user.email}
                </p>
                {user.user_metadata?.username && (
                  <p className="text-cream-light text-lg">
                    <span className="text-cream-light/70">Username:</span> {user.user_metadata.username}
                  </p>
                )}
                <button
                  onClick={() => signOut()}
                  className="mt-4 bg-coffee-dark/30 text-cream-light px-4 py-2 rounded-md hover:bg-coffee-dark/50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="bg-coffee-medium/80 rounded-lg p-6">
            <h2 className="font-display text-2xl font-bold text-cream-light mb-6">Order History</h2>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cream-light"></div>
                <p className="text-cream-light mt-2">Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-cream-light">You haven't placed any orders yet.</p>
                <button onClick={() => router.push("/menu")} className="mt-4 btn-primary">
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-coffee-dark/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-cream-light font-medium">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-cream-light/70 text-sm">
                          {new Date(order.created_at).toLocaleDateString()} at{" "}
                          {new Date(order.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="bg-coffee-dark/30 px-3 py-1 rounded-full text-cream-light text-sm capitalize">
                        {order.status}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={item.products?.image || "/placeholder.svg"}
                              alt={item.products?.name || "Coffee"}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="text-cream-light">{item.products?.name || "Coffee Item"}</p>
                            <p className="text-cream-light/70 text-sm">
                              {item.size} × {item.quantity}
                            </p>
                          </div>
                          <p className="text-cream-light">PHP {item.price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-coffee-dark/30 flex justify-between">
                      <p className="text-cream-light">Total:</p>
                      <p className="text-cream-light font-bold">PHP {order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
