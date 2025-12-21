import Image from "next/image"
import Link from "next/link"

const BLOGS = [
  {
    id: 1,
    title: "Top 5 Basketball Drills",
    excerpt: "Improve your handles and shooting fast.",
    image: "/blog/1.jpg",
  },
  {
    id: 2,
    title: "How to Increase Vertical Jump",
    excerpt: "Science-based basketball jump training.",
    image: "/blog/2.jpg",
  },
  {
    id: 3,
    title: "Mental Toughness in Basketball",
    excerpt: "How pros stay focused under pressure.",
    image: "/blog/3.jpg",
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">🏀 Blog</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {BLOGS.map(blog => (
          <div
            key={blog.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-black/70"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={250}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="mt-2 text-sm text-gray-400">{blog.excerpt}</p>

              <Link
                href="#"
                className="mt-3 inline-block text-sm text-green-400 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
