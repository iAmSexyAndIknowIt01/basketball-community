"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/useAuth"

export default function ProfilePage() {
  const { isLoggedIn, userId } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch profile when userId is available
  useEffect(() => {
    if (!isLoggedIn || !userId) {
      setProfile(null)
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (!error) {
        setProfile(data)
      } else {
        console.error("Profile fetch error:", error.message)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [isLoggedIn, userId])

  if (loading) return <p className="text-gray-400">Loading profile...</p>
  if (!profile) return <p className="text-gray-400">Not logged in</p>

  return (
    <div>
      {/* Page title */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-gray-400">
          Manage your personal information
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Basic info */}
        <div className="card">
          <h3 className="font-semibold mb-2">Basic Info</h3>

          <p className="text-sm text-gray-400">Name</p>
          <p className="mb-2">{profile.name}</p>

          <p className="text-sm text-gray-400">User ID</p>
          <p className="text-xs text-gray-500">
            {userId?.slice(0, 12)}…
          </p>
        </div>

        {/* Membership */}
        <div className="card">
          <h3 className="font-semibold mb-2">Membership</h3>

          <p className="text-sm text-gray-400">Status</p>
          <p
            className={`font-medium ${
              profile.membership_status === "active"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {profile.membership_status}
          </p>

          <button className="btn-primary mt-4 w-full">
            Manage Membership
          </button>
        </div>

        {/* Account info */}
        <div className="card sm:col-span-2">
          <h3 className="font-semibold mb-2">Account</h3>

          <p className="text-sm text-gray-400">Email</p>
          <p className="mb-2">{profile.email}</p>

          <p className="text-sm text-gray-400">Joined</p>
          <p className="text-xs text-gray-500">
            {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
