import Search from "@/components/search"
import { lusitana } from "@/app/fonts"
import { PostsTableSkeleton } from "@/components/skeletons"
import { Suspense } from "react"
import PostsTable from "./_components/posts-table"
import { Metadata } from "next"
import { CreatePost } from "./_components/buttons"

export const metadata: Metadata = {
  title: "Posts",
}

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
  const currentPage = Number(page)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Posts</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search posts..." />
        <CreatePost />
      </div>
      <Suspense key={query + currentPage} fallback={<PostsTableSkeleton />}>
        <PostsTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}
