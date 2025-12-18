"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store/useAppStore"
import { useAuth } from "@/lib/useAuth"

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
  const { user, games, posts, loading, fetchGames, fetchPosts } = useAppStore()

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchGames()
      fetchPosts()
    }
  }, [isLoggedIn, userId, fetchGames, fetchPosts])

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
      <QuickActions />
      <MyActivity
        gamesCount={games.length}
        postsCount={posts.length}
      />
      <GamesSection games={games} loading={loading} />
      <PostsSection posts={posts} loading={loading} />
    </div>
  )
}
