"use client"
import { useState } from "react"

export default function CreateGameModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        + Create Game
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="card w-full max-w-md space-y-3">
            <h2 className="text-lg font-bold">Create Game</h2>

            <input className="input" placeholder="Title" />
            <input className="input" placeholder="Location" />
            <input className="input" type="datetime-local" />
            <input className="input" type="number" placeholder="Max players" />

            <div className="flex gap-2">
              <button className="btn-primary w-full">Save</button>
              <button
                className="w-full rounded-lg border border-white/10"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
