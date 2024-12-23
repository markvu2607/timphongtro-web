import { Suspense } from "react"
import { PostList } from "./_components/post-list"
// import { PostSearchForm } from "./_components/post-search-form"
import Search from "@/components/search"

type PostListPageProps = {
  searchParams: Promise<{
    page: number
    query: string
  }>
}

const PostListPage = async ({ searchParams }: PostListPageProps) => {
  const awaitedSearchParams = await searchParams
  const query =
    typeof awaitedSearchParams.query === "string"
      ? awaitedSearchParams.query
      : ""
  const page =
    typeof awaitedSearchParams.page === "string"
      ? parseInt(awaitedSearchParams.page)
      : 1

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold">Find your perfect stay</h1>
      <Search placeholder="Search for posts..." />
      {/* <PostSearchForm initialQuery={query} /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <PostList query={query} page={page} />
      </Suspense>
    </div>
  )
}

export default PostListPage
