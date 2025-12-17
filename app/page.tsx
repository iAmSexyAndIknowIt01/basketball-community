import Link from "next/link"
import { games } from "@/lib/dummy/games"
import { posts } from "@/lib/dummy/posts"

export default function Home() {
  return (
    <div className="space-y-10">

      {/* HERO */}
      <section className="rounded-2xl bg-linear-to-br from-green-500/20 to-transparent p-8">
        <h1 className="mb-2 text-3xl font-bold">
          🏀 Basketball Community
        </h1>
        <p className="max-w-xl text-gray-400">
          Join local pickup games, connect with players,
          and grow your basketball community.
        </p>

        <div className="mt-6 flex gap-3">
          <Link href="/games" className="btn-primary">
            Find Games
          </Link>
          <Link
            href="/community"
            className="rounded-lg border border-white/10 px-4 py-2"
          >
            Community Feed
          </Link>
        </div>
      </section>

      {/* UPCOMING GAMES */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming Games</h2>
          <Link href="/games" className="text-sm text-gray-400 hover:text-white">
            View all →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {games.slice(0, 2).map(game => (
            <div key={game.id} className="card">
              <h3 className="font-medium">{game.title}</h3>
              <p className="text-sm text-gray-400">{game.location}</p>
              <p className="text-xs text-gray-500">
                {new Date(game.game_date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY POSTS */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Community</h2>
          <Link
            href="/community"
            className="text-sm text-gray-400 hover:text-white"
          >
            Open feed →
          </Link>
        </div>

        <div className="space-y-3">
          {posts.slice(0, 2).map(post => (
            <div key={post.id} className="card">
              <p className="text-sm text-gray-300">{post.content}</p>
              <p className="mt-2 text-xs text-gray-500">
                — {post.author}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
