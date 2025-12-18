export default function LandingFeatures() {
  return (
    <section className="space-y-4">
      {/* Title */}
      <h3 className="text-lg font-semibold">Benefits</h3>

      {/* Features */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">🏀 Create & join games</div>
        <div className="card">💬 Community feed</div>
        <div className="card">💳 Membership access</div>
      </div>
    </section>
  )
}
