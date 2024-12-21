import React from "react"
import { MapPinnedIcon, PhoneCallIcon } from "lucide-react"
import dayjs from "dayjs"

import { Post } from "@/types"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type Props = {
  post: Post
}

export const PostDetails = ({ post }: Props) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-base font-bold">{post.title}</h1>
        <p className="text-sm font-light text-gray-700">
          <MapPinnedIcon className="relative -top-0.5 mr-2 inline size-4" />
          {post.address}
        </p>
        <div className="flex items-baseline gap-8">
          <p className="text-lg font-semibold text-green-500">
            {post.price.toLocaleString()}đ / tháng
          </p>
          <p className="text-sm text-gray-700">{post.area}m²</p>
          <p className="text-sm text-gray-700">
            Đăng {dayjs(post.publishedAt).fromNow()}
          </p>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Thông tin mô tả</h2>
        <div className="whitespace-pre-line">{post.description}</div>
      </div>
      <Separator />
      <div className="h-[400px]" />
      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Thông tin liên hệ</h2>
        <div className="flex items-center gap-4">
          <Avatar className="size-24">
            <AvatarImage src={post.user?.avatar} />
          </Avatar>
          <div className="space-y-1 text-sm">
            <p className="text-sm font-bold">{post.user?.name}</p>
            <p>{post.user?.email}</p>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center"
            >
              <PhoneCallIcon />
              {post.user?.phone}
            </Button>
          </div>
        </div>
        <div className="rounded-md border border-orange-400 bg-yellow-100 p-4 text-sm">
          <p className="font-bold">Lưu ý:</p>
          <p>
            Chỉ đặt khi cọc xác định được chủ nhà và có thỏa thuận biên nhận rõ
            ràng. Kiểm tra mọi điều khoản và yêu cầu liệt kê tất cả chi phí hàng
            tháng vào hợp đồng.
          </p>
          <p>
            Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham
            khảo. Nếu bạn thấy rằng tin đăng này không đúng hoặc có dấu hiệu lừa
            đảo, hãy phản ánh với chúng tôi.
          </p>
        </div>
      </div>
    </div>
  )
}
