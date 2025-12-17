import { supabase } from "@/lib/supabase"
import PostForm from "@/components/PostForm"

export default async function CommunityPage() {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <PostForm />

      <div className="space-y-3">
        {data?.map(post => (
          <div key={post.id} className="card">
            <p className="text-sm">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
