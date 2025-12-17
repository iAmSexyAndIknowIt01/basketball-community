"use client"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <button
      className="text-sm text-gray-400"
      onClick={() => setDark(!dark)}
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  )
}
