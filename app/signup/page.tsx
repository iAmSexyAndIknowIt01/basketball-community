"use client"

import AuthModal from "@/components/AuthForm"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  return (
    <AuthModal
      mode="signup"
      onClose={() => router.push("/")}
    />
  )
}
