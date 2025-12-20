import Link from "next/link";

export default function CreatePostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Post</h1>

      <p className="text-sm text-gray-400">
        Share your thoughts or news with the basketball community.
      </p>

      {/* Post create form (temporary placeholder) */}
      <div className="card space-y-4">
        <input
          type="text"
          placeholder="Post title"
          className="input"
        />

        <textarea
          placeholder="Write your post here..."
          className="input h-32 resize-none"
        />

        <button className="btn-primary w-full">
          Publish Post
        </button>
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="text-sm text-green-400 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  )
}
