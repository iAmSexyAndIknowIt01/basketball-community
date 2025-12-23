"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import CreateGameModal, { NewGame } from "@/components/CreateGameModal"
import { useAuth } from "@/lib/useAuth"
import { useAdmin } from "@/lib/useAdmin"

/* ================= TYPES ================= */
type Game = {
  id: string
  title: string
  location: string
  game_date: string
  players: number
  max_players: number
  team_a_name: string | null
  team_b_name: string | null
}

type GamePlayer = {
  user_id: string
  ot_team: string
}

/* ================= COMPONENT ================= */
export default function GamesPage() {
  const { userId, isLoggedIn } = useAuth()
  const isAdmin = useAdmin(userId)

  const [games, setGames] = useState<Game[]>([])
  const [joiningGameId, setJoiningGameId] = useState<string | null>(null)
  const [joinedGameIds, setJoinedGameIds] = useState<Set<string>>(new Set())
  const [playersByGame, setPlayersByGame] = useState<Record<string, GamePlayer[]>>({})

  // Modal state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

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

    if (!error) {
      setGames(data || [])
      data?.forEach(g => fetchGamePlayers(g.id))
    }
  }

  const fetchJoinedGames = async () => {
    const { data, error } = await supabase
      .from("game_players")
      .select("game_id")
      .eq("user_id", userId)

    if (!error && data) {
      setJoinedGameIds(new Set(data.map(gp => gp.game_id)))
    }
  }

  const fetchGamePlayers = async (gameId: string) => {
    const { data } = await supabase
      .from("game_players")
      .select("user_id, ot_team")
      .eq("game_id", gameId)

    if (data) {
      setPlayersByGame(prev => ({
        ...prev,
        [gameId]: data,
      }))
    }
  }

  /* ================= CREATE GAME (ADMIN) ================= */
  const handleCreateGame = async (newGame: NewGame) => {
    const { data, error } = await supabase
      .from("games")
      .insert({
        ...newGame,
        players: 0,
      })
      .select()
      .single()

    if (error) throw error
    setGames(prev => [...prev, data])
  }

  /* ================= JOIN / CANCEL GAME ================= */
  const handleJoinGame = async (game: Game) => {
    if (!userId) return
    const hasJoined = joinedGameIds.has(game.id)

    setJoiningGameId(game.id)

    if (hasJoined) {
      if (!confirm("Та тоглолтоос гарахдаа итгэлтэй байна уу?")) {
        setJoiningGameId(null)
        return
      }
      await supabase.from("game_players").delete().eq("game_id", game.id).eq("user_id", userId)
      await supabase.from("games").update({ players: game.players - 1 }).eq("id", game.id)
      setGames(prev => prev.map(g => g.id === game.id ? { ...g, players: g.players - 1 } : g))
      setJoinedGameIds(prev => { const copy = new Set(prev); copy.delete(game.id); return copy })
    } else {
      if (game.players >= game.max_players) {
        alert("This game is full")
        setJoiningGameId(null)
        return
      }

      const teams = [game.team_a_name, game.team_b_name].filter((t): t is string => Boolean(t))
      if (teams.length === 0) {
        alert("This game does not have teams set")
        setJoiningGameId(null)
        return
      }
      const randomTeam = teams[Math.floor(Math.random() * teams.length)]

      await supabase.from("game_players").insert({ game_id: game.id, user_id: userId, ot_team: randomTeam })
      await supabase.from("games").update({ players: game.players + 1 }).eq("id", game.id)
      setGames(prev => prev.map(g => g.id === game.id ? { ...g, players: g.players + 1 } : g))
      setJoinedGameIds(prev => new Set(prev).add(game.id))
    }

    fetchGamePlayers(game.id)
    setJoiningGameId(null)
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
          return (
            <div
              key={game.id}
              className="card p-4 border border-white/10 rounded-lg hover:bg-gray-800 cursor-pointer"
              onClick={() => setSelectedGame(game)} // Card дарвал modal гарна
            >
              <h3 className="font-semibold text-lg">{game.title}</h3>
              <p className="text-xs text-gray-300 mt-1">{game.team_a_name} vs {game.team_b_name}</p>
              <p className="text-sm text-gray-400">{game.location}</p>
              <p className="text-xs text-gray-500">{new Date(game.game_date).toLocaleString()}</p>
              <p className="text-xs">{game.players}/{game.max_players} players</p>

              <button
                className={`mt-2 w-full py-1 rounded text-white ${
                  hasJoined ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={(e) => {
                  e.stopPropagation() // Card-н onClick-тэй мөргөлдөөс сэргийлэх
                  handleJoinGame(game)
                }}
                disabled={joiningGameId === game.id || (!hasJoined && isFull)}
              >
                {hasJoined ? "Cancel" : isFull ? "Full" : "Join"}
              </button>
            </div>
          )
        })}
      </div>

      {/* ================= MODAL ================= */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedGame.title}</h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedGame(null)}
              >
                ✕
              </button>
            </div>

            <p className="text-sm mb-2">{selectedGame.team_a_name} vs {selectedGame.team_b_name}</p>
            <p className="text-xs text-gray-500">{selectedGame.location}</p>
            <p className="text-xs text-gray-500 mb-4">{new Date(selectedGame.game_date).toLocaleString()}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">{selectedGame.team_a_name}</p>
                {(playersByGame[selectedGame.id] || [])
                  .filter(p => p.ot_team === selectedGame.team_a_name)
                  .map(p => <p key={p.user_id}>• {p.user_id}</p>)}
              </div>
              <div>
                <p className="font-semibold">{selectedGame.team_b_name}</p>
                {(playersByGame[selectedGame.id] || [])
                  .filter(p => p.ot_team === selectedGame.team_b_name)
                  .map(p => <p key={p.user_id}>• {p.user_id}</p>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
