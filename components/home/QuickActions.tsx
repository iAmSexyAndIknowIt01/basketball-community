"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/useAuth"
import { useAdmin } from "@/lib/useAdmin"

export default function QuickActions() {
  const { userId } = useAuth()
  const isAdmin = useAdmin(userId)

  const [showAdminOnly, setShowAdminOnly] = useState(false)

  const handleCreateGameClick = () => {
    if (!isAdmin) {
      setShowAdminOnly(true)
      return
    }

    // admin бол create game page рүү явна
    window.location.href = "/games/create"
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2">
        {/* ➕ CREATE GAME */}
        <button
          onClick={handleCreateGameClick}
          className="card block text-left cursor-pointer hover:bg-white/10 transition-all"
        >
          ➕ Create Game
        </button>

        {/* ✍️ CREATE POST */}
        <Link
          href="/community/create"
          className="card block hover:bg-white/5 transition-colors"
        >
          ✍️ Create Post
        </Link>
      </section>

      {/* ❌ ADMIN ONLY MODAL */}
      {showAdminOnly && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="card p-4 space-y-3 text-center max-w-sm w-full">
            <h2 className="font-bold">Permission denied</h2>
            <p className="text-sm text-gray-300">
              Admin can create game
            </p>
            <button
              className="btn-primary w-full"
              onClick={() => setShowAdminOnly(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
