import { games } from "@/lib/dummy/games"
import CreateGameModal from "@/components/CreateGameModal"

export default function GamesPage() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Games</h1>
        <CreateGameModal />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {games.map(game => (
          <div key={game.id} className="card">
            <h3 className="font-semibold">{game.title}</h3>
            <p className="text-sm text-gray-400">{game.location}</p>
            <p className="text-xs text-gray-500">
              {new Date(game.game_date).toLocaleString()}
            </p>
            <p className="text-xs">
              {game.players}/{game.max_players} players
            </p>
            <button className="btn-primary mt-2">Join</button>
          </div>
        ))}
      </div>
    </div>
  )
}
