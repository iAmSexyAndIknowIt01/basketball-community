import { supabase } from "@/lib/supabase"

export default async function ProfilePage() {
  const { data: user } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.user?.id)
    .single()

  return (
    <div className="card max-w-md">
      <h1 className="mb-4 text-xl font-bold">Profile</h1>

      <p className="text-sm text-gray-400">Name</p>
      <p className="mb-3">{profile?.name}</p>

      <p className="text-sm text-gray-400">Membership</p>
      <p
        className={
          profile?.membership_status === "active"
            ? "text-green-400"
            : "text-red-400"
        }
      >
        {profile?.membership_status}
      </p>
    </div>
  )
}
