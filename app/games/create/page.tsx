import NextLink from "next/link"

export default function CreateGamePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Game</h1>

      <p className="text-sm text-gray-400">
        Create a new basketball game and invite players.
      </p>

      {/* Game create form */}
      <div className="card space-y-4">
        <input
          type="text"
          placeholder="Game title"
          className="input"
        />

        <input
          type="text"
          placeholder="Location"
          className="input"
        />

        <input
          type="datetime-local"
          className="input"
        />

        <input
          type="number"
          min={2}
          max={30}
          placeholder="Max players"
          className="input"
        />

        <button className="btn-primary w-full">
          Create Game
        </button>
      </div>

      {/* Back link */}
      <NextLink
        href="/"
        className="text-sm text-green-400 hover:underline"
      >
        ← Back to Home
      </NextLink>
    </div>
  )
}
