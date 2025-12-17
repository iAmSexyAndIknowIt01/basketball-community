"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function PostForm() {
  const [content, setContent] = useState("")

  const post = async () => {
    const { data } = await supabase.auth.getUser()
    await supabase.from("posts").insert({
      user_id: data.user?.id,
      content,
    })
    setContent("")
  }

  return (
    <div className="card mb-4">
      <textarea
        className="input h-24 resize-none"
        placeholder="Share something with the community..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={post} className="btn-primary mt-2">
        Post
      </button>
    </div>
  )
}
