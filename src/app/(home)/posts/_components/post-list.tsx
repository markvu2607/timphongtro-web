import { PaginationComponent } from "./pagination"
import { getPosts } from "@/lib/data"
import { PostCard } from "./post-card"

const ITEMS_PER_PAGE = 10

export async function PostList({
  query,
  page,
}: {
  query: string
  page: number
}) {
  const {
    items: posts,
    totalPages,
    page: currentPage,
  } = await getPosts({ page, query, limit: ITEMS_PER_PAGE })

  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        {/* TODO: show not found any post */}
        No posts found matching your search.
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  )
}