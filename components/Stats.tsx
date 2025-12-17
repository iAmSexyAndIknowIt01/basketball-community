export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="card">
        <p className="text-2xl font-bold">120+</p>
        <p className="text-sm text-gray-400">Players</p>
      </div>
      <div className="card">
        <p className="text-2xl font-bold">45</p>
        <p className="text-sm text-gray-400">Games</p>
      </div>
      <div className="card">
        <p className="text-2xl font-bold">5</p>
        <p className="text-sm text-gray-400">Courts</p>
      </div>
    </div>
  )
}
