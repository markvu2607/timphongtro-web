import { lusitana } from "@/app/fonts"
import { getMe } from "@/lib/data"
import UpdateProfileForm from "./_components/update-profile-form"

export default async function ProfilePage() {
  const user = await getMe()

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Profile</h1>
      </div>
      <div className="mt-8 w-full max-w-[300px]">
        <UpdateProfileForm user={user} />
      </div>
    </div>
  )
}
