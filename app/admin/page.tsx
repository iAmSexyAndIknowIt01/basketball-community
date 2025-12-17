import { joinRequests } from "@/lib/dummy/requests"
import { currentUser } from "@/lib/dummy/users"

export default function AdminPage() {
  if (currentUser.role !== "admin") {
    return <p>Access denied</p>
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Join Requests</h1>

      {joinRequests.map(req => (
        <div key={req.id} className="card mb-3 flex justify-between">
          <div>
            <p className="font-medium">{req.user}</p>
            <p className="text-sm text-gray-400">{req.game}</p>
          </div>

          <div className="flex gap-2">
            <button className="btn-primary">Approve</button>
            <button className="rounded-lg border border-white/10 px-3">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
