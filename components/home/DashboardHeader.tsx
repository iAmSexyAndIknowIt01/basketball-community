type Props = {
  name: string
}

export default function DashboardHeader({ name }: Props) {
  return (
    <h2 className="text-2xl font-bold">
      Welcome back, {name}
    </h2>
  )
}
