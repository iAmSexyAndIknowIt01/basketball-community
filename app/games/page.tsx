"use client"

import { games } from "@/lib/dummy/games"
import CreateGameModal from "@/components/CreateGameModal"
import { useAuth } from "@/lib/useAuth"
import { useAdmin } from "@/lib/useAdmin"

export default function GamesPage() {
  const { userId, isLoggedIn, user } = useAuth() // Шинэ hook ашиглав
  const isAdmin = useAdmin(userId)


  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Games</h1>

        {/* ✅ Зөвхөн admin хэрэглэгч харах боломжтой */}
        {isAdmin && <CreateGameModal />}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {games.map(game => (
          <div key={game.id} className="card p-4 border border-white/10 rounded-lg">
            <h3 className="font-semibold text-lg">{game.title}</h3>
            <p className="text-sm text-gray-400">{game.location}</p>
            <p className="text-xs text-gray-500">
              {new Date(game.game_date).toLocaleString()}
            </p>
            <p className="text-xs">
              {game.players}/{game.max_players} players
            </p>

            {/* ✅ Join button зөвхөн logged in хэрэглэгчдэд */}
            {isLoggedIn && (
              <button className="btn-primary mt-2">Join</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
