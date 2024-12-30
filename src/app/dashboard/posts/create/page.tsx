import Breadcrumbs from "@/components/breadcrums"
import * as districtApi from "@/lib/api/district.api"
import * as paymentPackageApi from "@/lib/api/payment-package.api"
import * as provinceApi from "@/lib/api/province.api"
import { CreatePostForm } from "../_components/create-post-form"

export default async function CreatePostPage() {
  const provinces = await provinceApi.getAllProvinces()
  const districts = await districtApi.getAllDistricts()
  const paymentPackages = await paymentPackageApi.getAllPaymentPackages()

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
      <CreatePostForm
        provinces={provinces}
        districts={districts}
        paymentPackages={paymentPackages}
      />
    </main>
  )
}
