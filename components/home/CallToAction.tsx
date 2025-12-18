import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="card flex items-center justify-between">
      <p className="font-medium">
        Ready to play some basketball? 🏀
      </p>
      <Link href="/signup" className="btn-primary">
        Join now
      </Link>
    </section>
  )
}
