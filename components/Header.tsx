"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/useAuth"
import AuthModal from "./AuthForm"
import { User as UserIcon, Menu, X } from "lucide-react"

export default function Header() {
  const { isLoggedIn, userId } = useAuth()
  const router = useRouter()

  const [open, setOpen] = useState<"login" | "signup" | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    // 1️⃣ Supabase session clear
    await supabase.auth.signOut()

    // 2️⃣ UI state clear
    setProfileOpen(false)
    setMenuOpen(false)

    // 3️⃣ Optional: client storage clear
    localStorage.clear()
    sessionStorage.clear()

    // 4️⃣ Home рүү буцаах (history солих)
    router.replace("/")

    // 5️⃣ Next.js cache refresh (VERY IMPORTANT)
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold">🏀 Hoop</Link>

        {/* Desktop */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-300 items-center">
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
            <div className="relative ml-4">
              <button
                onClick={() => setProfileOpen(p => !p)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <UserIcon size={18} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-black/80 p-4 shadow-lg backdrop-blur text-sm">
                  <p className="mb-2 text-gray-400">
                    User: {userId?.slice(0, 8)}…
                  </p>
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

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          className="md:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90">
          <div className="flex flex-col gap-4 px-4 py-4">
            <Link href="/games" onClick={() => setMenuOpen(false)}>Games</Link>
            <Link href="/community" onClick={() => setMenuOpen(false)}>Community</Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>

            {!isLoggedIn ? (
              <>
                <button onClick={() => setOpen("login")}>Login</button>
                <button onClick={() => setOpen("signup")} className="btn-primary">
                  Sign up
                </button>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      )}

      {open && <AuthModal mode={open} onClose={() => setOpen(null)} />}
    </header>
  )
}
