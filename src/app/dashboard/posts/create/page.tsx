import { CreatePostForm } from "../_components/create-post-form"
import Breadcrumbs from "@/components/breadcrums"
import { getAllDistricts, getAllProvinces } from "@/lib/data"

export default async function CreatePostPage() {
  const provinces = await getAllProvinces()
  const districts = await getAllDistricts()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Posts", href: "/dashboard/posts" },
          {
            label: "Create Post",
            href: "/dashboard/posts/create",
            active: true,
          },
        ]}
      />
      <CreatePostForm provinces={provinces} districts={districts} />
    </main>
  )
}
