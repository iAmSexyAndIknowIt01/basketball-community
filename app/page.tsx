"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useAppStore } from "@/lib/store/useAppStore"
import EmptyState from "@/components/EmptyState"
import { SkeletonCard } from "@/components/Skeleton"
import Stats from "@/components/Stats"

export default function Home() {
  const { user, games, posts, loading, fetchGames, fetchPosts } = useAppStore()

  // API fetch on mount
  useEffect(() => {
    fetchGames()
    fetchPosts()
  }, [fetchGames, fetchPosts])

  // 🔓 LOGGED OUT → LANDING PAGE
  if (!user) {
    return (
      <div className="space-y-10">

        {/* HERO */}
        <section className="rounded-2xl bg-linear-to-br from-green-500/20 p-10">
          <h1 className="text-4xl font-bold mb-3">
            🏀 Basketball Community
          </h1>
          <p className="max-w-xl text-gray-400">
            Find games, meet players, and grow together.
          </p>

          <div className="mt-6 flex gap-3">
            {/* <Link href="/signup" className="btn-primary">
              Join now
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-white/10 px-4 py-2"
            >
              Login
            </Link> */}
          </div>
        </section>

        <Stats />

        {/* FEATURES */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="card">🏀 Create & join games</div>
          <div className="card">💬 Community feed</div>
          <div className="card">💳 Membership access</div>
        </section>
      </div>
    )
  }

  // 🔐 LOGGED IN → DASHBOARD
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Welcome back, {user.name}
      </h2>

      {/* GAMES */}
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

      {/* POSTS */}
      <section>
        <h3 className="mb-2 font-semibold">Community</h3>

        {loading && <SkeletonCard />}

        {!loading && posts.length === 0 ? (
          <EmptyState
            title="No posts yet"
            description="Start the conversation"
          />
        ) : (
          posts.map(post => (
            <div key={post.id} className="card mb-2">
              <p>{post.content}</p>
              <p className="text-gray-400 text-xs">— {post.author}</p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
