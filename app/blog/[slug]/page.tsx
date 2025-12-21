import { supabase } from "@/lib/supabase"
import { marked } from "marked"
import Image from "next/image"

export default async function BlogDetail({ params }: any) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (!data) return null

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">{data.title}</h1>

      {data.image_url && (
        <Image
          src={data.image_url}
          alt={data.title}
          width={800}
          height={400}
          className="mb-6 rounded"
        />
      )}

      <article
        className="prose prose-invert"
        dangerouslySetInnerHTML={{
          __html: marked(data.content),
        }}
      />
    </div>
  )
}
