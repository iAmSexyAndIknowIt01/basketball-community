"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/useAuth"
import { useAdmin } from "@/lib/useAdmin"
import { marked } from "marked"
import Link from "next/link"

export default function BlogPage() {
  const { userId } = useAuth()
  const isAdmin = useAdmin(userId)

  const [blogs, setBlogs] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setBlogs(data || []))
  }, [])

  const uploadImage = async () => {
    if (!image) return null
    const path = `${Date.now()}-${image.name}`

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(path, image)

    if (error) throw error

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(path)

    return data.publicUrl
  }

  const publish = async () => {
    const imageUrl = await uploadImage()

    await supabase.from("blogs").insert({
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      excerpt: content.slice(0, 120),
      content,
      image_url: imageUrl,
      author_id: userId,
    })

    location.reload()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">🏀 Blog</h1>

      {/* BLOG LIST */}
      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map(blog => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="overflow-hidden rounded-xl border border-white/10 bg-black/70"
          >
            {blog.image_url && (
              <Image
                src={blog.image_url}
                alt={blog.title}
                width={400}
                height={250}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="mt-2 text-sm text-gray-400">{blog.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ADMIN FORM */}
      {isAdmin && (
        <div className="mt-14 rounded-xl border border-white/10 bg-black/80 p-6">
          <h2 className="mb-4 text-xl font-bold">✍️ New Blog</h2>

          <input
            placeholder="Title"
            className="mb-3 w-full rounded bg-black p-3"
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Markdown content"
            rows={6}
            className="mb-3 w-full rounded bg-black p-3"
            onChange={e => setContent(e.target.value)}
          />

          <input
            type="file"
            onChange={e => setImage(e.target.files?.[0] || null)}
            className="mb-4"
          />

          <button onClick={publish} className="btn-primary">
            Publish
          </button>
        </div>
      )}
    </div>
  )
}
