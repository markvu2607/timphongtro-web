import { PostPagination } from "./post-pagination"
import * as postApi from "@/lib/api/post.api"
import { PostCard } from "./post-card"

const ITEMS_PER_PAGE = 10

export async function PostList({
  query,
  page,
  otherFilter,
}: {
  query: string
  page: number
  otherFilter: Record<string, string>
}) {
  const {
    items: posts,
    totalPages,
    page: currentPage,
  } = await postApi.getPublishedPosts({
    page,
    query,
    limit: ITEMS_PER_PAGE,
    ...otherFilter,
  })

  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        {/* TODO: show not found any post */}
        No posts found matching your search.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {totalPages > 1 && (
        <PostPagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  )
}
