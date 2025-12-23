"use client"

import { useState } from "react"

/* ================= TYPES ================= */

export type NewGame = {
  title: string
  location: string
  game_date: string
  max_players: number
  team_a_name: string
  team_b_name: string
}

interface CreateGameModalProps {
  onCreate: (newGame: NewGame) => Promise<void>
}

/* ================= COMPONENT ================= */

export default function CreateGameModal({
  onCreate,
}: CreateGameModalProps) {
  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [gameDate, setGameDate] = useState("")
  const [maxPlayers, setMaxPlayers] = useState<number | "">("")
  const [teamA, setTeamA] = useState("")
  const [teamB, setTeamB] = useState("")

  const [saving, setSaving] = useState(false)

  const reset = () => {
    setTitle("")
    setLocation("")
    setGameDate("")
    setMaxPlayers("")
    setTeamA("")
    setTeamB("")
  }

  const handleSave = async () => {
    // 🔒 validation
    if (
      !title ||
      !location ||
      !gameDate ||
      !maxPlayers ||
      !teamA ||
      !teamB
    )
      return

    // 🔒 runtime safety
    if (typeof onCreate !== "function") {
      console.error("CreateGameModal: onCreate prop is missing")
      return
    }

    const newGame: NewGame = {
      title,
      location,
      game_date: new Date(gameDate).toISOString(),
      max_players: Number(maxPlayers),
      team_a_name: teamA,
      team_b_name: teamB,
    }

    try {
      setSaving(true)
      await onCreate(newGame)
      setOpen(false)
      reset()
    } catch (err) {
      console.error("Failed to create game:", err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {/* OPEN BUTTON */}
      <button className="btn-primary" onClick={() => setOpen(true)}>
        + Create Game
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="card w-full max-w-md space-y-3 p-4">
            <h2 className="text-lg font-bold">Create Game</h2>

            <input
              className="input"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              className="input"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />

            <input
              className="input"
              type="datetime-local"
              value={gameDate}
              onChange={e => setGameDate(e.target.value)}
            />

            <input
              className="input"
              type="number"
              placeholder="Max players"
              value={maxPlayers === "" ? "" : String(maxPlayers)}
              onChange={e =>
                setMaxPlayers(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />

            {/* 🆕 TEAM INPUTS */}
            <input
              className="input"
              placeholder="Team A name"
              value={teamA}
              onChange={e => setTeamA(e.target.value)}
            />

            <input
              className="input"
              placeholder="Team B name"
              value={teamB}
              onChange={e => setTeamB(e.target.value)}
            />

            <div className="flex gap-2 pt-2">
              <button
                className="btn-primary w-full"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                className="w-full rounded-lg border border-white/10"
                onClick={() => {
                  setOpen(false)
                  reset()
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
