import { NewsPagination } from "./news-pagination"
import * as newsApi from "@/lib/api/news.api"
import { NewsCard } from "./news-card"
import { Fragment } from "react"
import { Separator } from "@/components/ui/separator"

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
    <div className="space-y-4">
      <div>
        {news.map((item, index) => (
          <Fragment key={item.id}>
            <NewsCard key={item.id} news={item} />
            {index < news.length - 1 && <Separator className="my-4" />}
          </Fragment>
        ))}
      </div>
      {totalPages > 1 && (
        <NewsPagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  )
}
