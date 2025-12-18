import Link from "next/link"

export default function QuickActions() {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <Link href="/games/create" className="card hover:bg-white/5">
        ➕ Create Game
      </Link>
      <Link href="/community/create" className="card hover:bg-white/5">
        ✍️ Create Post
      </Link>
    </section>
  )
}
