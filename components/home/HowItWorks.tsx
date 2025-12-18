export default function HowItWorks() {
  return (
    <section className="space-y-4">
      {/* Title */}
      <h3 className="text-lg font-semibold">
        How it works
      </h3>

      {/* Steps */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">1️⃣ Sign up & create profile</div>
        <div className="card">2️⃣ Join or create games</div>
        <div className="card">3️⃣ Play & connect</div>
      </div>
    </section>
  )
}
