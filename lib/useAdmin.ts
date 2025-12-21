import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useAdmin(userId?: string | null) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!userId) return

    supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", userId)
      .single()
      .then(({ data }) => {
        setIsAdmin(!!data?.is_admin)
      })
  }, [userId])

  return isAdmin
}
