import { getMe } from "@/lib/data"

export default async function DashboardPage() {
  const user = await getMe()

  return (
    <div>
      Dashboard
      <p>{JSON.stringify(user)}</p>
    </div>
  )
}
