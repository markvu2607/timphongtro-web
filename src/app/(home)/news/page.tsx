import { Suspense } from "react"

import { NewsList } from "./_components/news-list"
import Search from "@/components/search"

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

const NewsListPage = async ({ searchParams }: PostListPageProps) => {
  const awaitedSearchParams = await searchParams

  const { page: awaitedPage, query: awaitedQuery } = awaitedSearchParams

  const query = typeof awaitedQuery === "string" ? awaitedQuery : ""
  const page = typeof awaitedPage === "string" ? parseInt(awaitedPage) : 1

  return (
    <main className="mx-auto max-w-7xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
      <Search placeholder="Tìm kiếm bài viết..." />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsList query={query} page={page} />
      </Suspense>
    </main>
  )
}

export default NewsListPage
