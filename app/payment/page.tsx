import { currentUser } from "@/lib/dummy/users"

export default function PaymentPage() {
  return (
    <div className="card max-w-md">
      <h1 className="text-xl font-bold mb-2">Membership</h1>

      <p className="mb-4 text-sm text-gray-400">
        Status:{" "}
        <span className="text-green-400">
          {currentUser.membership}
        </span>
      </p>

      <button className="btn-primary w-full">
        Pay yearly fee (Dummy)
      </button>
    </div>
  )
}
