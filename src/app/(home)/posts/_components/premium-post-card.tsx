import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Post } from "@/types"

type PremiumPostCardProps = {
  post: Post
}

export function PremiumPostCard({ post }: PremiumPostCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden",
        post.paymentPackage!.price > 0 && "bg-orange-50"
      )}
    >
      <Link href={`/posts/${post.id}`}>
        <CardContent className="flex items-center gap-2 p-2">
          <div className="relative aspect-square w-16 overflow-hidden rounded-md">
            <Image
              src={post.postImages![0].url}
              alt={`Post image for ${post.title}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="line-clamp-2 text-sm font-semibold">{post.title}</p>
            <div className="flex justify-between">
              <p className="text-xs font-semibold text-green-500">
                {post.price.toLocaleString()}đ / tháng
              </p>
              <p className="text-xs text-gray-500">
                Đăng {dayjs(post.publishedAt).fromNow()}
              </p>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
