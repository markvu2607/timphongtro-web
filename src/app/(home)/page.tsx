import { Suspense } from "react"

import * as provinceApi from "@/lib/api/province.api"
import * as districtApi from "@/lib/api/district.api"
import { PostList } from "./posts/_components/post-list"
import { PostSearchForm } from "./posts/_components/post-search-form"
import { PremiumPostList } from "./posts/_components/premium-post-list"
import { RecentNewsList } from "./news/_components/recent-news-list"

type PageProps = {
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

const Page = async ({ searchParams }: PageProps) => {
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
      <PostSearchForm provinces={provinces} districts={districts} />

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Suspense fallback={<div>Loading...</div>}>
            <PostList query={query} page={page} otherFilter={rest} />
          </Suspense>
        </div>
        <div className="col-span-1">
          <div className="sticky top-24 space-y-4">
            <PremiumPostList />
            <RecentNewsList />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page
