import { create } from 'zustand'

interface User {
  id: number
  name: string
  username: string
  email: string
  street_address: string
  city: string
  province: string
  birth_date: string
  contact_number: string
  gender: string
  role: string
  created_at: string
  updated_at: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))
