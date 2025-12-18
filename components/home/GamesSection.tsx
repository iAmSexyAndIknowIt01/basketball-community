import EmptyState from "@/components/EmptyState"
import { SkeletonCard } from "@/components/Skeleton"

type Game = {
  id: string
  title: string
  location: string
}

type Props = {
  games: Game[]
  loading: boolean
}

export default function GamesSection({ games, loading }: Props) {
  return (
    <section>
      <h3 className="mb-2 font-semibold">Upcoming Games</h3>

      {loading && <SkeletonCard />}

      {!loading && games.length === 0 && (
        <EmptyState
          title="No games yet"
          description="Create or join a game to get started"
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {games.map(game => (
          <div key={game.id} className="card">
            <p className="font-medium">{game.title}</p>
            <p className="text-sm text-gray-400">{game.location}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
