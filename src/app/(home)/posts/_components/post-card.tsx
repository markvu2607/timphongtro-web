"use client"

import { PhoneCallIcon } from "lucide-react"
import Link from "next/link"
import { Ribbon, RibbonContainer } from "react-ribbons"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Post } from "@/types"
import { QuiltedImages } from "./quilted-images"

type PostCardProps = {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <RibbonContainer>
      <Card
        className={cn(
          "overflow-hidden",
          post.paymentPackage.price > 0 && "bg-orange-50"
        )}
      >
        <Link href={`/posts/${post.id}`}>
          <CardHeader className="p-4 pb-0">
            <QuiltedImages
              images={post.postImages.map((image) => image.url).slice(0, 4)}
            />
          </CardHeader>
        </Link>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <Link href={`/posts/${post.id}`}>
                <h3 className="text-lg font-semibold">{post.title}</h3>
              </Link>
              <div className="flex items-baseline gap-8">
                <p className="text-lg font-semibold text-green-500">
                  {post.price.toLocaleString()}đ / tháng
                </p>
                <p className="text-sm text-gray-700">{post.area}m²</p>
                <p className="text-sm text-gray-700">
                  {post.district.name}, {post.province.name}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {post.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <div className="flex items-center gap-2">
            <Avatar className="size-12">
              <AvatarImage src={post.user?.avatar} />
            </Avatar>
            <div className="space-y-1 text-sm">
              <p className="text-sm font-bold">{post.user?.name}</p>
              <p className="text-xs text-gray-700">{post.user?.email}</p>
            </div>
          </div>
          <div>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center"
            >
              <PhoneCallIcon />
              {post.user?.phone}
            </Button>
          </div>
        </CardFooter>
      </Card>
      {post.paymentPackage.price > 0 && (
        <Ribbon
          side="left"
          type="corner"
          size="large"
          backgroundColor="#E16A54"
          color="#fff"
          fontFamily="Arial"
          withStripes={true}
        >
          Nổi bật
        </Ribbon>
      )}
    </RibbonContainer>
  )
}
