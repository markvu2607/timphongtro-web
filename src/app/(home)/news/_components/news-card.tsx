import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { News } from "@/types"

type NewsCardProps = {
  news: News
}

export const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Card key={news.id} className="flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={news.thumbnail.src}
          alt={`Thumbnail for ${news.title}`}
          fill
          className="rounded-t-lg object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link href={`/news/${news.id}`}>{news.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">
          {news.shortDescription}
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-start space-y-2">
        <div className="flex w-full items-center justify-between">
          {news.province && (
            <Badge variant="secondary">{news.province.name}</Badge>
          )}
          <span className="text-sm text-muted-foreground">
            {dayjs(news.publishedAt).fromNow()}
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/news/${news.id}`}
            className="text-primary hover:underline"
          >
            Read more
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
