"use client"
import { supabase } from "@/lib/supabase"

export default function GameCard({ game }: any) {
  const join = async () => {
    const { data } = await supabase.auth.getUser()
    await supabase.from("game_requests").insert({
      game_id: game.id,
      user_id: data.user?.id,
    })
  }

  return (
    <div className="card space-y-2">
      <h3 className="text-lg font-semibold">{game.title}</h3>
      <p className="text-sm text-gray-400">📍 {game.location}</p>
      <p className="text-xs text-gray-500">
        {new Date(game.game_date).toLocaleString()}
      </p>

      <button onClick={join} className="btn-primary mt-2">
        Join game
      </button>
    </div>
  )
}
