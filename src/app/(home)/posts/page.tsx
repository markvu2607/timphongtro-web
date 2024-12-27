import { Suspense } from "react"

import * as provinceApi from "@/lib/api/province.api"
import * as districtApi from "@/lib/api/district.api"
import { PostList } from "./_components/post-list"
import { PostSearchForm } from "./_components/post-search-form"

type PostListPageProps = {
  searchParams: Promise<{
    page: number
    query: string
    provinceId?: string
    districtId?: string
    minArea?: string
    maxArea?: string
    minPrice?: string
    maxPrice?: string
  }>
}

const PostListPage = async ({ searchParams }: PostListPageProps) => {
  const awaitedSearchParams = await searchParams

  const {
    page: awaitedPage,
    query: awaitedQuery,
    ...rest
  } = awaitedSearchParams

  const query = typeof awaitedQuery === "string" ? awaitedQuery : ""
  const page = typeof awaitedPage === "string" ? parseInt(awaitedPage) : 1

  const provinces = await provinceApi.getAllProvinces()
  const districts = await districtApi.getAllDistricts()

  return (
    <main className="mx-auto max-w-7xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
      {/* <h1 className="mb-6 text-3xl font-bold">Find your perfect stay</h1> */}
      <PostSearchForm provinces={provinces} districts={districts} />
      <Suspense fallback={<div>Loading...</div>}>
        <PostList query={query} page={page} otherFilter={rest} />
      </Suspense>
    </main>
  )
}

export default PostListPage
