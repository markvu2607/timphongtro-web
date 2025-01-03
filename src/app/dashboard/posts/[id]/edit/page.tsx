import { notFound } from "next/navigation"

import Breadcrumbs from "@/components/breadcrums"
import * as districtApi from "@/lib/api/district.api"
import * as paymentPackageApi from "@/lib/api/payment-package.api"
import * as postApi from "@/lib/api/post.api"
import * as provinceApi from "@/lib/api/province.api"
import { EditPostForm } from "../../_components/edit-post-form"

type Params = Promise<{ id: string }>

type EditPostPageProps = {
  params: Params
}

export default async function EditPostPage(props: EditPostPageProps) {
  const { id } = await props.params
  const post = await postApi.getMyPostById(id)
  const provinces = await provinceApi.getAllProvinces()
  const districts = await districtApi.getAllDistricts()
  const paymentPackages = await paymentPackageApi.getAllPaymentPackages()

  if (!post) {
    return notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Quản lý bài đăng", href: "/dashboard/posts" },
          {
            label: "Sửa bài đăng",
            href: `/dashboard/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPostForm
        post={post}
        provinces={provinces}
        districts={districts}
        paymentPackages={paymentPackages}
      />
    </main>
  )
}
