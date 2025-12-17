"use client"
import { useState } from "react"
import Link from "next/link"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 bg-black z-50 p-6 space-y-4">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/games">Games</Link>
          <Link href="/community">Community</Link>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </>
  )
}
