import Breadcrumbs from "@/components/breadcrums"
import { getAllDistricts, getAllProvinces, getMyPostById } from "@/lib/data"
import { notFound } from "next/navigation"
import { EditPostForm } from "../../_components/edit-post-form"

type Params = Promise<{ id: string }>

type EditPostPageProps = {
  params: Params
}

export default async function EditPostPage(props: EditPostPageProps) {
  const { id } = await props.params
  const post = await getMyPostById(id)
  const provinces = await getAllProvinces()
  const districts = await getAllDistricts()

  if (!post) {
    return notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Posts", href: "/dashboard/posts" },
          {
            label: "Edit Post",
            href: `/dashboard/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPostForm post={post} provinces={provinces} districts={districts} />
    </main>
  )
}
