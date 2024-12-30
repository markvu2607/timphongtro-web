import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { News } from "@/types"

type RecentNewsCardProps = {
  news: News
}

export const RecentNewsCard = ({ news }: RecentNewsCardProps) => {
  return (
    <Card className={"overflow-hidden"}>
      <Link href={`/news/${news.id}`}>
        <CardContent className="flex items-center gap-2 p-2">
          <div className="relative aspect-square w-16 overflow-hidden rounded-md">
            <Image
              src={news.thumbnail.src}
              alt={`Thumbnail for ${news.title}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="line-clamp-2 text-sm font-semibold">{news.title}</p>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">{news.province!.name}</p>
              <p className="text-xs text-gray-500">
                Đăng {dayjs(news.publishedAt).fromNow()}
              </p>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
