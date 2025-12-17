"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    setLoading(true)
    setError(null)

    try {
      if (type === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error

        await supabase.from("profiles").insert({
          id: data.user?.id,
          name,
        })
      }

      router.push("/")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mx-auto mt-24 max-w-md">
      {/* Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-green-500/30 blur-xl" />

      {/* Card */}
      <div className="relative rounded-2xl bg-black/80 p-8 shadow-2xl backdrop-blur">
        <h1 className="mb-2 text-center text-2xl font-bold">
          {type === "login" ? "Welcome back" : "Create account"}
        </h1>

        <p className="mb-6 text-center text-sm text-gray-400">
          {type === "login"
            ? "Login to continue"
            : "Join the basketball community"}
        </p>

        <div className="space-y-4">
          {type === "signup" && (
            <Field
              label="Name"
              type="text"
              onChange={setName}
            />
          )}

          <Field
            label="Email"
            type="email"
            onChange={setEmail}
          />

          <Field
            label="Password"
            type="password"
            onChange={setPassword}
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="btn-primary mt-6 w-full disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : type === "login"
            ? "Login"
            : "Create account"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <a href="/signup" className="text-green-400 hover:underline">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/login" className="text-green-400 hover:underline">
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

/* ------------------ */
/* Floating Input UI */
/* ------------------ */

function Field({
  label,
  type,
  onChange,
}: {
  label: string
  type: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <input
        type={type}
        required
        onChange={e => onChange(e.target.value)}
        className="peer w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-green-500"
      />
      <label className="pointer-events-none absolute left-4 top-3 text-sm text-gray-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400 peer-valid:-top-2 peer-valid:text-xs">
        {label}
      </label>
    </div>
  )
}
