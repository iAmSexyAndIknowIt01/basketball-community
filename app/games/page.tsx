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
  const [joiningGameId, setJoiningGameId] = useState<string | null>(null)
  const [joinedGameIds, setJoinedGameIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchGames()
    if (userId) fetchJoinedGames()
  }, [userId])

  /* ================= FETCH ================= */
  const fetchGames = async () => {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("game_date", { ascending: true })

    if (!error) setGames(data || [])
  }

  const fetchJoinedGames = async () => {
    const { data, error } = await supabase
      .from("game_players")
      .select("game_id")
      .eq("user_id", userId)

    if (!error && data) {
      const joinedIds = new Set(data.map(gp => gp.game_id))
      setJoinedGameIds(joinedIds)
    }
  }

  /* ================= CREATE GAME (ADMIN) ================= */
  const handleCreateGame = async (newGame: {
    title: string
    location: string
    game_date: string
    max_players: number
  }) => {
    const { data, error } = await supabase
      .from("games")
      .insert({ ...newGame, players: 0 })
      .select()
      .single()

    if (error) {
      console.error("Insert game failed:", error.message)
      throw error
    }

    setGames(prev => [...prev, data])
  }

  /* ================= JOIN / CANCEL GAME ================= */
  const handleJoinGame = async (game: Game) => {
    if (!userId) return
    const hasJoined = joinedGameIds.has(game.id)

    // Cancel join
    if (hasJoined) {
      const confirmCancel = confirm("Та тоглолтоос гарахдаа итгэлтэй байна уу?")
      if (!confirmCancel) return

      try {
        setJoiningGameId(game.id)

        // 1️⃣ game_players-с устгах
        const { error: gpError } = await supabase
          .from("game_players")
          .delete()
          .eq("game_id", game.id)
          .eq("user_id", userId)

        if (gpError) {
          alert(gpError.message)
          return
        }

        // 2️⃣ games.players -1
        const { data: currentGame, error: fetchError } = await supabase
          .from("games")
          .select("players")
          .eq("id", game.id)
          .single()

        if (!fetchError && currentGame) {
          const { error: gError } = await supabase
            .from("games")
            .update({ players: currentGame.players - 1 })
            .eq("id", game.id)

          if (gError) console.error("Failed to update players count:", gError.message)
        }

        // 3️⃣ UI update
        setGames(prev =>
          prev.map(g => (g.id === game.id ? { ...g, players: g.players - 1 } : g))
        )
        setJoinedGameIds(prev => {
          const copy = new Set(prev)
          copy.delete(game.id)
          return copy
        })
      } catch (err) {
        console.error("Cancel join failed:", err)
      } finally {
        setJoiningGameId(null)
      }

      return
    }

    // New join
    if (game.players >= game.max_players) {
      alert("This game is full")
      return
    }

    try {
      setJoiningGameId(game.id)

      const { error: gpError } = await supabase
        .from("game_players")
        .insert({ game_id: game.id, user_id: userId })

      if (gpError) {
        alert(gpError.message)
        return
      }

      // Update games.players
      const { data: currentGame, error: fetchError } = await supabase
        .from("games")
        .select("players")
        .eq("id", game.id)
        .single()

      if (!fetchError && currentGame) {
        const { error: gError } = await supabase
          .from("games")
          .update({ players: game.players + 1 })
          .eq("id", game.id)

        if (gError) console.error("Failed to update players count:", gError.message)
      }

      // UI update
      setGames(prev =>
        prev.map(g => (g.id === game.id ? { ...g, players: g.players + 1 } : g))
      )
      setJoinedGameIds(prev => new Set(prev).add(game.id))
    } catch (err) {
      console.error("Join failed:", err)
    } finally {
      setJoiningGameId(null)
    }
  }

  /* ================= UI ================= */
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Games</h1>
        {isAdmin && <CreateGameModal onCreate={handleCreateGame} />}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {games.map(game => {
          const isFull = game.players >= game.max_players
          const hasJoined = joinedGameIds.has(game.id)

          // Button class өнгөөр ялгах + жижиг хэмжээ
          let btnClass = "btn-sm mt-2 text-white w-full py-1 rounded"
          if (hasJoined) btnClass += " bg-red-600 hover:bg-red-700"
          else if (isFull) btnClass += " bg-gray-400 cursor-not-allowed"
          else btnClass += " bg-green-600 hover:bg-green-700"

          return (
            <div key={game.id} className="card p-4 border border-white/10 rounded-lg">
              <h3 className="font-semibold text-lg">{game.title}</h3>
              <p className="text-sm text-gray-400">{game.location}</p>
              <p className="text-xs text-gray-500">
                {new Date(game.game_date).toLocaleString()}
              </p>
              <p className="text-xs">
                {game.players}/{game.max_players} players
              </p>

              {isLoggedIn && (
                <button
                  className={btnClass}
                  disabled={joiningGameId === game.id || (isFull && !hasJoined)}
                  onClick={() => handleJoinGame(game)}
                >
                  {hasJoined
                    ? "Cancel"
                    : isFull
                    ? "Full"
                    : joiningGameId === game.id
                    ? "Joining..."
                    : "Join"}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
