import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  title: string
  slug: string
  author: string
  price: number
  originalPrice?: number
  coverUrl: string | null
}

interface CartState {
  items: CartItem[]
  couponCode: string | null
  couponDiscount: number
  couponType: "PERCENTAGE" | "FIXED" | null
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  applyCoupon: (code: string, discount: number, type: "PERCENTAGE" | "FIXED") => void
  removeCoupon: () => void
  subtotal: () => number
  discount: () => number
  total: () => number
  hasItem: (id: string) => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,
      couponType: null,

      addItem: (item) => {
        const exists = get().items.find((i) => i.id === item.id)
        if (exists) return
        set((state) => ({ items: [...state.items, item] }))
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
      },

      clearCart: () => {
        set({ items: [], couponCode: null, couponDiscount: 0, couponType: null })
      },

      applyCoupon: (code, discount, type) => {
        set({ couponCode: code, couponDiscount: discount, couponType: type })
      },

      removeCoupon: () => {
        set({ couponCode: null, couponDiscount: 0, couponType: null })
      },

      subtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price, 0)
      },

      discount: () => {
        const state = get()
        const sub = state.subtotal()
        if (!state.couponCode) return 0
        if (state.couponType === "PERCENTAGE") {
          return sub * (state.couponDiscount / 100)
        }
        return Math.min(state.couponDiscount, sub)
      },

      total: () => {
        const state = get()
        return Math.max(0, state.subtotal() - state.discount())
      },

      hasItem: (id) => {
        return get().items.some((i) => i.id === id)
      },
    }),
    { name: "ebook-cart" }
  )
)
