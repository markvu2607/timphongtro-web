import { NewsPagination } from "./news-pagination"
import * as newsApi from "@/lib/api/news.api"
import { NewsCard } from "./news-card"

const ITEMS_PER_PAGE = 15

export async function NewsList({
  query,
  page,
}: {
  query: string
  page: number
}) {
  const {
    items: news,
    totalPages,
    page: currentPage,
  } = await newsApi.getPublishedNewsList({
    page,
    query,
    limit: ITEMS_PER_PAGE,
  })

  if (news.length === 0) {
    return (
      <div className="py-8 text-center">
        {/* TODO: show not found any post */}
        No news found matching your search.
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
          <NewsPagination totalPages={totalPages} currentPage={currentPage} />
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  )
}
