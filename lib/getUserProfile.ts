import { supabase } from "@/lib/supabase"

export async function getUserProfile() {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null

  const { data } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", auth.user.id)
    .single()

  return data
}
