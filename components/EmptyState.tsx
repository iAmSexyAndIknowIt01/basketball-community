export default function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="card text-center py-10 text-gray-400">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  )
}
