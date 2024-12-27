import dayjs from "dayjs"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import * as newsApi from "@/lib/api/news.api"

type NewsDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params

  const news = await newsApi.getPublishedNewsDetail(id)

  if (!news) {
    notFound()
  }

  return (
    <article className="container mx-auto max-w-4xl space-y-4 px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">{news.title}</h1>
      <p className="text-gray-500">{news.shortDescription}</p>
      <div className="mb-6 flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          Đăng {dayjs(news.publishedAt).fromNow()}
        </span>
        {news.province && (
          <Badge variant="secondary" className="text-gray-500">
            {news.province.name}
          </Badge>
        )}
      </div>
      <div className="relative mb-6 flex h-[400px] w-full justify-center">
        <Image
          src={news.thumbnail.src}
          alt={`Thumbnail for ${news.title}`}
          width={1200}
          height={400}
          className="rounded-lg object-contain"
        />
      </div>
      <Separator className="my-6" />
      <div
        className="ql-snow"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </article>
  )
}
