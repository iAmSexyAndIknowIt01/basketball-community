import EmptyState from "@/components/EmptyState"
import { SkeletonCard } from "@/components/Skeleton"

type Post = {
  id: string
  content: string
  author: string
}

type Props = {
  posts: Post[]
  loading: boolean
}

export default function PostsSection({ posts, loading }: Props) {
  return (
    <section>
      <h3 className="mb-2 font-semibold">Community</h3>

      {loading && <SkeletonCard />}

      {!loading && posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Start the conversation"
        />
      ) : (
        posts.map(post => (
          <div key={post.id} className="card mb-2">
            <p>{post.content}</p>
            <p className="text-gray-400 text-xs">
              — {post.author}
            </p>
          </div>
        ))
      )}
    </section>
  )
}
