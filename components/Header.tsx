"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/useAuth"
import AuthModal from "./AuthForm"
import { User as UserIcon } from "lucide-react"

export default function Header() {
  const { isLoggedIn, userId } = useAuth()
  const [open, setOpen] = useState<"login" | "signup" | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      // session болон user state-г clear хийх
      setProfileOpen(false)
    } else {
      console.error("Logout error:", error.message)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold">🏀 Hoop</Link>

        <nav className="flex gap-6 text-sm text-gray-300 items-center">
          <Link href="/games" className="hover:text-white">Games</Link>
          <Link href="/community" className="hover:text-white">Community</Link>
          <Link href="/profile" className="hover:text-white">Profile</Link>

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
            <div className="relative ml-6">
              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <UserIcon size={18} className="text-white" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-black/80 p-4 shadow-lg backdrop-blur text-sm text-gray-200 z-50">
                  <p className="mb-2">User ID: {userId?.slice(0, 8)}...</p>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left rounded px-2 py-1 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {open && <AuthModal mode={open} onClose={() => setOpen(null)} />}
    </header>
  )
}
