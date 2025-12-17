import { create } from "zustand"
import { supabase } from "@/lib/supabase"

type Game = { id: string; title: string; location: string; date: string }
type Post = { id: string; author: string; content: string }

type State = {
  user: null | { name: string; loggedIn: boolean }
  games: Game[]
  posts: Post[]
  loading: boolean
  fetchGames: () => Promise<void>
  fetchPosts: () => Promise<void>
}

export const useAppStore = create<State>((set) => ({
  user: null,
  games: [],
  posts: [],
  loading: false,
  
  fetchGames: async () => {
    set({ loading: true })
    const { data, error } = await supabase.from('games').select('*')
    if (!error && data) set({ games: data, loading: false })
    else set({ loading: false })
  },

  fetchPosts: async () => {
    set({ loading: true })
    const { data, error } = await supabase.from('posts').select('*')
    if (!error && data) set({ posts: data, loading: false })
    else set({ loading: false })
  },
}))
