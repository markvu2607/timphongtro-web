import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { News } from "@/types"

type NewsCardProps = {
  news: News
}

export const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link href={`/news/${news.id}`}>
      <div className="flex gap-x-4">
        <div className="relative aspect-square w-40 overflow-hidden rounded-md">
          <Image
            src={news.thumbnail.src}
            alt={`Thumbnail for ${news.title}`}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <p className="line-clamp-2 text-lg font-semibold">{news.title}</p>
            <p className="line-clamp-3 text-sm text-gray-500">
              {news.shortDescription}
            </p>
          </div>
          <div>
            <span className="text-sm">
              Đăng {dayjs(news.publishedAt).fromNow()}
            </span>
            {news.province && (
              <>
                <span className="mx-4">|</span>
                <Badge variant="secondary">{news.province.name}</Badge>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
