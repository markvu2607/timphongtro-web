import { Card, CardContent, CardHeader } from "@/components/ui/card"
import * as newsApi from "@/lib/api/news.api"
import { RecentNewsCard } from "./recent-news-card"

export const RecentNewsList = async () => {
  const recentNewsList = await newsApi.getRecentPublishedNewsList()

  if (!recentNewsList.length) {
    return null
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <p className="font-semibold">Tin tức gần đây</p>
      </CardHeader>
      <CardContent className="space-y-2 p-4 pt-0">
        {recentNewsList.slice(0, 5).map((news) => (
          <RecentNewsCard key={news.id} news={news} />
        ))}
      </CardContent>
    </Card>
  )
}
