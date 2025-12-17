"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import AuthModal from "./AuthForm"
import { useAuth } from "@/lib/useAuth"

export default function Header() {
  const { isLoggedIn, userId } = useAuth()
  const [open, setOpen] = useState<"login" | "signup" | null>(null)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          🏀 Hoop
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm text-gray-300 items-center">
          <Link href="/games" className="hover:text-white">Games</Link>
          <Link href="/community" className="hover:text-white">Community</Link>
          <Link href="/profile" className="hover:text-white">Profile</Link>

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setOpen("login")}
                className="rounded-lg border border-white/10 px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => setOpen("signup")}
                className="btn-primary"
              >
                Sign up
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 text-sm text-gray-400">
              Logged in <span className="text-green-400">{userId?.slice(0, 6)}...</span>
              <button
                onClick={handleLogout}
                className="ml-4 rounded-lg border border-white/10 px-3 py-1 text-sm hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Auth Modal */}
        {open && (
          <AuthModal
            mode={open}
            onClose={() => setOpen(null)}
          />
        )}
      </div>
    </header>
  )
}
function setUser(arg0: null) {
    throw new Error("Function not implemented.")
}
