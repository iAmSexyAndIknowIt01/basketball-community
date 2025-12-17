"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const submit = async () => {
    if (type === "login") {
      await supabase.auth.signInWithPassword({ email, password })
    } else {
      const { data } = await supabase.auth.signUp({ email, password })
      await supabase.from("profiles").insert({
        id: data.user?.id,
        name,
      })
    }
    router.push("/")
  }

  return (
    <div className="mx-auto mt-16 max-w-md rounded-xl bg-(--card) p-6 shadow-xl">
      <h1 className="mb-6 text-center text-xl font-bold">
        {type === "login" ? "Welcome back" : "Create account"}
      </h1>

      {type === "signup" && (
        <input
          className="input"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
      )}

      <input
        className="input"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit} className="btn-primary mt-4 w-full">
        {type === "login" ? "Login" : "Sign up"}
      </button>
    </div>
  )
}
