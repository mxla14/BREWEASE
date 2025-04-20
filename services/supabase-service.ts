import { supabase } from "@/utils/supabase/client"
import type { CartItem } from "@/context/cart-context"

export type Order = {
  id: string
  created_at: string
  user_id: string
  status: "pending" | "processing" | "completed" | "cancelled"
  total: number
  items: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  size: string
  notes: string
  price: number
}

export async function fetchProducts(category?: string) {
  let query = supabase.from("products").select("*").eq("available", true)

  if (category && category !== "all") {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data
}

export async function fetchProductById(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function createOrder(userId: string, items: CartItem[], total: number) {
  // First, create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        status: "pending",
        total: total,
      },
    ])
    .select()

  if (orderError || !order || order.length === 0) {
    console.error("Error creating order:", orderError)
    return { success: false, error: orderError }
  }

  const orderId = order[0].id

  // Then, create order items
  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    size: item.size,
    notes: item.notes,
    price: item.price,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    console.error("Error creating order items:", itemsError)
    return { success: false, error: itemsError }
  }

  return { success: true, orderId }
}

export async function fetchUserOrders(userId: string) {
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (ordersError) {
    console.error("Error fetching orders:", ordersError)
    return []
  }

  // For each order, fetch its items
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("*, products(*)")
        .eq("order_id", order.id)

      if (itemsError) {
        console.error("Error fetching order items:", itemsError)
        return { ...order, items: [] }
      }

      return { ...order, items }
    }),
  )

  return ordersWithItems
}

export async function saveUserPreferences(userId: string, preferences: any) {
  const { data, error } = await supabase
    .from("user_preferences")
    .upsert([
      {
        user_id: userId,
        preferences,
      },
    ])
    .select()

  if (error) {
    console.error("Error saving user preferences:", error)
    return { success: false, error }
  }

  return { success: true, data }
}

export async function fetchUserPreferences(userId: string) {
  const { data, error } = await supabase.from("user_preferences").select("*").eq("user_id", userId).single()

  if (error) {
    if (error.code === "PGRST116") {
      // No preferences found, not an error
      return null
    }
    console.error("Error fetching user preferences:", error)
    return null
  }

  return data.preferences
}
