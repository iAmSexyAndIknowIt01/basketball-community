import Link from "next/link"

export default function QuickActions() {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <Link
        href="/games/create"
        className="card block cursor-pointer hover:bg-white/10 transition-all"
      >
        ➕ Create Game
      </Link>

      <Link
        href="/community/create"
        className="card block hover:bg-white/5 transition-colors"
      >
        ✍️ Create Post
      </Link>
    </section>
  )
}
