"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import CreateGameModal from "@/components/CreateGameModal"
import { useAuth } from "@/lib/useAuth"
import { useAdmin } from "@/lib/useAdmin"

type Game = {
  id: string
  title: string
  location: string
  game_date: string
  players: number
  max_players: number
}

export default function GamesPage() {
  const { userId, isLoggedIn } = useAuth()
  const isAdmin = useAdmin(userId)

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    const { data } = await supabase
      .from("games")
      .select("*")
      .order("game_date", { ascending: true })

    setGames(data || [])
  }

  // ✅ ЭНЭ ФУНКЦИЙГ CreateGameModal-д дамжуулна
  const handleCreateGame = async (newGame: {
    title: string
    location: string
    game_date: string
    max_players: number
  }) => {
    const { data, error } = await supabase
      .from("games")
      .insert({
        ...newGame,
        players: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Insert game failed:", error.message)
      throw error
    }

    // UI update
    setGames(prev => [...prev, data])
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Games</h1>

        {/* 🔥 ЭНЭ МӨР ХАМГИЙН ЧУХАЛ */}
        {isAdmin && <CreateGameModal onCreate={handleCreateGame} />}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {games.map(game => (
          <div
            key={game.id}
            className="card p-4 border border-white/10 rounded-lg"
          >
            <h3 className="font-semibold text-lg">{game.title}</h3>
            <p className="text-sm text-gray-400">{game.location}</p>
            <p className="text-xs text-gray-500">
              {new Date(game.game_date).toLocaleString()}
            </p>
            <p className="text-xs">
              {game.players}/{game.max_players} players
            </p>

            {isLoggedIn && (
              <button className="btn-primary mt-2">Join</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
