import { Metadata } from "next"
import { Suspense } from "react"

import { lusitana } from "@/app/fonts"
import Search from "@/components/search"
import { PostsTableSkeleton } from "@/components/skeletons"
import * as postApi from "@/lib/api/post.api"
import { isApiResponseError } from "@/lib/type-predicates"
import { CreatePost } from "./_components/buttons"
import PostsTable from "./_components/posts-table"

export const metadata: Metadata = {
  title: "Posts",
}

const ITEMS_PER_PAGE = 10

type SearchParams = Promise<{
  query?: string
  page?: string
}>

export default async function ManagePostsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { query = "", page = "1" } = await searchParams
  const res = await postApi.getMyPosts({
    query,
    page: Number(page),
    limit: ITEMS_PER_PAGE,
  })

  if (isApiResponseError(res)) {
    if (res.statusCode === 403) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Please verify your email</h1>
          <p className="text-gray-600">
            You need to verify your email to access this page
          </p>
        </div>
      )
    }
  } else {
    const { items, totalPages } = res

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Posts</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search posts..." />
          <CreatePost />
        </div>
        <Suspense key={query + Number(page)} fallback={<PostsTableSkeleton />}>
          <PostsTable items={items} totalPages={totalPages} />
        </Suspense>
      </div>
    )
  }
}
