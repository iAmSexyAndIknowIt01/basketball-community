"use client"

import { useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import PasswordStrength from "./PasswordStrength"
import { Mail, Lock, User, X } from "lucide-react"
import Portal from "@/components/Portal"

export default function AuthModal({
  mode,
  onClose,
}: {
  mode: "login" | "signup" | "forgot"
  onClose: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [view, setView] = useState(mode)

  // 🔒 Double click hard lock
  const submittingRef = useRef(false)

  const submit = async () => {
    if (submittingRef.current) return
    submittingRef.current = true

    setLoading(true)
    setMessage(null)

    try {
      if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        onClose()
        return
      }

      if (view === "signup") {
        // 1️⃣ Supabase auth signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error

        if (!data.user) {
          setMessage("Check your email to confirm signup")
          return
        }

        // 2️⃣ Profile UPSERT (double click safe)
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(
            {
              id: data.user.id,
              email: data.user.email,
              name,
            },
            {
              onConflict: "id",
            }
          )

        if (profileError) {
          console.error("Profile upsert error:", profileError.message)
          // duplicate байвал signup амжилттайд тооцно
        }

        onClose()
        return
      }

      if (view === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) throw error
        setMessage("Password reset email sent")
        return
      }
    } catch (e: any) {
      setMessage(e.message ?? "Something went wrong")
    } finally {
      setLoading(false)
      submittingRef.current = false
    }
  }

  const googleLogin = async () => {
    if (submittingRef.current) return
    submittingRef.current = true
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm">
        <div className="absolute left-1/2 top-1/2 w-full max-w-md px-4 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute -inset-1 rounded-3xl bg-linear-to-br from-green-500/30 via-emerald-500/10 to-transparent blur-2xl" />

          <div className="relative max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-black/80 p-8 shadow-2xl backdrop-blur">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h2 className="text-2xl font-bold">
              {view === "login" && "Welcome back"}
              {view === "signup" && "Create account"}
              {view === "forgot" && "Reset password"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Basketball community access
            </p>

            <div className="mt-6 space-y-4">
              {view === "signup" && (
                <Field
                  icon={<User size={16} />}
                  label="Name"
                  type="text"
                  onChange={setName}
                />
              )}

              <Field
                icon={<Mail size={16} />}
                label="Email"
                type="email"
                onChange={setEmail}
              />

              {view !== "forgot" && (
                <>
                  <Field
                    icon={<Lock size={16} />}
                    label="Password"
                    type="password"
                    onChange={setPassword}
                  />
                  {view === "signup" && (
                    <PasswordStrength password={password} />
                  )}
                </>
              )}
            </div>

            {message && (
              <p className="mt-4 text-center text-sm text-green-400">
                {message}
              </p>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="btn-primary mt-6 w-full"
            >
              {loading
                ? "Please wait..."
                : view === "login"
                ? "Login"
                : view === "signup"
                ? "Create account"
                : "Send reset email"}
            </button>

            {view !== "forgot" && (
              <>
                <div className="my-6 flex items-center gap-3 text-xs text-gray-500">
                  <div className="h-px flex-1 bg-white/10" />
                  OR
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  onClick={googleLogin}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 hover:bg-white/5"
                >
                  <img src="/google.svg" className="h-4" />
                  Continue with Google
                </button>
              </>
            )}

            <div className="mt-6 text-center text-sm text-gray-400">
              {view === "login" && (
                <>
                  <button onClick={() => setView("forgot")} className="underline">
                    Forgot password?
                  </button>
                  <br />
                  No account?{" "}
                  <button
                    onClick={() => setView("signup")}
                    className="text-green-400 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}

              {view === "signup" && (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setView("login")}
                    className="text-green-400 hover:underline"
                  >
                    Login
                  </button>
                </>
              )}

              {view === "forgot" && (
                <button onClick={() => setView("login")} className="underline">
                  Back to login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

/* ----------------------------- */
/* Floating input field */
/* ----------------------------- */

function Field({
  label,
  type,
  icon,
  onChange,
}: {
  label: string
  type: string
  icon: React.ReactNode
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
      <input
        type={type}
        required
        onChange={e => onChange(e.target.value)}
        className="peer w-full rounded-lg border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-500"
      />
      <label className="pointer-events-none absolute left-10 top-3 text-sm text-gray-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400 peer-valid:-top-2 peer-valid:text-xs">
        {label}
      </label>
    </div>
  )
}
