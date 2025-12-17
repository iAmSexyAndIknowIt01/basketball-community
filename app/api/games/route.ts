import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from("games")
    .insert(body)
    .select()

  if (error) {
    return NextResponse.json(error, { status: 400 })
  }

  return NextResponse.json(data)
}
