"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useAuth } from "@/lib/useAuth" // таны useAuth

// PostForm
function PostForm({ onPost }: { onPost: (content: string) => void }) {
  const [content, setContent] = useState("")

  const submitPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onPost(content)
    setContent("")
  }

  return (
    <form
      onSubmit={submitPost}
      className="bg-neutral-800 p-4 rounded-2xl shadow-md flex flex-col gap-3"
    >
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full h-24 p-3 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
      />
      <button
        type="submit"
        className="bg-linear-to-r from-green-500 to-green-400 text-black font-semibold py-2 rounded-xl hover:opacity-90 transition"
      >
        Post
      </button>
    </form>
  )
}

// Dummy posts
const dummyPosts = [
  {
    id: 1,
    author: "John Doe",
    avatar: "https://i.pravatar.cc/40?img=1",
    content: "Can't wait for the weekend game! 🏀",
    created_at: "2025-12-19T10:00:00Z",
    likes: 5,
    comments: 2,
  },
  {
    id: 2,
    author: "Jane Smith",
    avatar: "https://i.pravatar.cc/40?img=2",
    content:
      "Looking for players for a friendly match tomorrow. DM me if interested!",
    created_at: "2025-12-18T15:30:00Z",
    likes: 3,
    comments: 1,
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(dummyPosts)
  const { isLoggedIn, userId } = useAuth()

  // New post handler
  const handleNewPost = (content: string) => {
    const newPost = {
      id: posts.length + 1,
      author: userId || "Anonymous",
      avatar: `https://i.pravatar.cc/40?u=${userId}`, // dummy avatar
      content,
      created_at: new Date().toISOString(),
      likes: 0,
      comments: 0,
    }
    setPosts([newPost, ...posts])
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-400">Community</h1>

      {isLoggedIn ? (
        <PostForm onPost={handleNewPost} />
      ) : (
        <p className="text-gray-400 text-sm">
          You must <span className="text-green-400 font-semibold">login</span> to post.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-neutral-900 border border-white/10 rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform cursor-pointer flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full border-2 border-green-400"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-green-400">
                  {post.author}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-200 mb-4">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-6 text-gray-400 text-xs mt-auto">
              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                <Heart size={16} /> {post.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
                <MessageCircle size={16} /> {post.comments}
              </button>
              <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
