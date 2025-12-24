"use client"

import { useEffect, useState } from "react"
import { useAppStore } from "@/lib/store/useAppStore"
import { useAuth } from "@/lib/useAuth"
import { useAdmin } from "@/lib/useAdmin"

import Stats from "@/components/Stats"
import LandingHero from "@/components/home/LandingHero"
import LandingFeatures from "@/components/home/LandingFeatures"
import HowItWorks from "@/components/home/HowItWorks"
import CallToAction from "@/components/home/CallToAction"

import DashboardHeader from "@/components/home/DashboardHeader"
import QuickActions from "@/components/home/QuickActions"
import GamesSection from "@/components/home/GamesSection"
import MyActivity from "@/components/home/MyActivity"
import PostsSection from "@/components/home/PostsSection"

export default function Home() {
  const { isLoggedIn, userId } = useAuth()
  const isAdmin = useAdmin(userId)

  const { user, games, posts, loading, fetchGames, fetchPosts } =
    useAppStore()

  const [showAdminOnlyModal, setShowAdminOnlyModal] = useState(false)

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchGames()
      fetchPosts()
    }
  }, [isLoggedIn, userId, fetchGames, fetchPosts])

  /* 👉 Create Game click handler */
  const handleCreateGameClick = () => {
    if (!isAdmin) {
      setShowAdminOnlyModal(true)
      return
    }

    // ✅ admin бол create game modal / flow
    document.dispatchEvent(new CustomEvent("open-create-game"))
  }

  /* 🔓 Logged out */
  if (!isLoggedIn) {
    return (
      <div className="space-y-10">
        <LandingHero />
        <Stats />
        <LandingFeatures />
        <HowItWorks />
        <CallToAction />
      </div>
    )
  }

  /* 🔐 Logged in */
  return (
    <div className="space-y-6">
      {user && <DashboardHeader name={user.name} />}

      {/* 🔑 Create Game товч admin шалгалттай */}
      <QuickActions />

      <MyActivity
        gamesCount={games.length}
        postsCount={posts.length}
      />

      <GamesSection games={games} loading={loading} />
      <PostsSection posts={posts} loading={loading} />

      {/* 🔒 ADMIN ONLY MODAL */}
      {showAdminOnlyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="card w-full max-w-sm p-4 space-y-4 text-center">
            <h2 className="text-lg font-bold">Permission denied</h2>
            <p className="text-sm text-gray-300">
              Admin can create game
            </p>
            <button
              className="btn-primary w-full"
              onClick={() => setShowAdminOnlyModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
