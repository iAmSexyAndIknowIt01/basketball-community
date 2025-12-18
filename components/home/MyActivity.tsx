type Props = {
  gamesCount: number
  postsCount: number
}

export default function MyActivity({ gamesCount, postsCount }: Props) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="card">🏀 Games joined: {gamesCount}</div>
      <div className="card">💬 Posts created: {postsCount}</div>
    </section>
  )
}
