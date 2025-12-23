"use client"

import { useState } from "react"
import NextLink from "next/link"
import { supabase } from "@/lib/supabase" // Supabase client-аа импортлоорой

export default function CreateGamePage() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [gameDate, setGameDate] = useState("")
  const [maxPlayers, setMaxPlayers] = useState<number | "">("")
  const [teamA, setTeamA] = useState("")
  const [teamB, setTeamB] = useState("")
  const [saving, setSaving] = useState(false)

  const resetForm = () => {
    setTitle("")
    setLocation("")
    setGameDate("")
    setMaxPlayers("")
    setTeamA("")
    setTeamB("")
  }

  const handleCreateGame = async () => {
    // 🔒 Validation
    if (!title || !location || !gameDate || !maxPlayers || !teamA || !teamB) {
      alert("Please fill all fields")
      return
    }

    const newGame = {
      title,
      location,
      game_date: new Date(gameDate).toISOString(),
      max_players: Number(maxPlayers),
      team_a_name: teamA,
      team_b_name: teamB,
      players: 0, // анх 0 тоглогчтой
    }

    try {
      setSaving(true)

      // 🔑 Supabase руу insert хийх
      const { data, error } = await supabase
        .from("games")
        .insert(newGame)
        .select()
        .single()

      if (error) throw error

      alert(`Game "${data.title}" created successfully!`)
      resetForm()
    } catch (err) {
      console.error("Failed to create game:", err)
      alert("Failed to create game. Check console for details.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Game</h1>

      <p className="text-sm text-gray-400">
        Create a new basketball game and invite players.
      </p>

      {/* Game create form */}
      <div className="card space-y-4 p-4">
        <input
          type="text"
          placeholder="Game title"
          className="input w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="input w-full"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <input
          type="datetime-local"
          className="input w-full"
          value={gameDate}
          onChange={e => setGameDate(e.target.value)}
        />

        <input
          type="number"
          min={2}
          max={30}
          placeholder="Max players"
          className="input w-full"
          value={maxPlayers === "" ? "" : String(maxPlayers)}
          onChange={e =>
            setMaxPlayers(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        {/* Team A & B inputs */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Team A Name"
            className="input w-full"
            value={teamA}
            onChange={e => setTeamA(e.target.value)}
          />
          <input
            type="text"
            placeholder="Team B Name"
            className="input w-full"
            value={teamB}
            onChange={e => setTeamB(e.target.value)}
          />
        </div>

        <button
          className="btn-primary w-full"
          onClick={handleCreateGame}
          disabled={saving}
        >
          {saving ? "Creating..." : "Create Game"}
        </button>
      </div>

      {/* Back link */}
      <NextLink
        href="/"
        className="text-sm text-green-400 hover:underline"
      >
        ← Back to Home
      </NextLink>
    </div>
  )
}
