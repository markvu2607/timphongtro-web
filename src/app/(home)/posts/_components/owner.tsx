"use client"

import {
  BookmarkIcon,
  CopyIcon,
  PhoneCallIcon,
  ShareIcon,
  TriangleAlertIcon,
} from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Post } from "@/types"
import { ReportPost } from "./report-post"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

type Props = {
  post: Post
}

export const Owner = ({ post }: Props) => {
  const [isSaved, setIsSaved] = useState(false)
  const [openShare, setOpenShare] = React.useState(false)
  const [openReport, setOpenReport] = React.useState(false)

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPostIds") || "[]")
    setIsSaved(savedPosts.includes(post.id))
  }, [post.id])

  const haveToggleSave = () => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPostIds") || "[]")

    if (!isSaved) {
      savedPosts.push(post.id)
      toast.success("Lưu bài đăng thành công!")
    } else {
      const index = savedPosts.indexOf(post.id)
      savedPosts.splice(index, 1)
      toast.success("Bỏ lưu bài đăng thành công!")
    }

    localStorage.setItem("savedPostIds", JSON.stringify(savedPosts))
    setIsSaved(!isSaved)
  }

  const handleClickCopy = () => {
    const shareUrl = document.querySelector("#share-url")?.textContent?.trim()
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success("Đã sao chép đường dẫn!")
        setOpenShare(false)
      })
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-24">
            <AvatarImage src={post.user?.avatar || "/default-avatar.png"} />
          </Avatar>
          <div className="text-center">
            <p className="text-xl font-bold">{post.user?.name}</p>
            <p className="text-sm font-light text-gray-500">
              {post.user?.email}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="flex w-full items-center justify-center"
        >
          <PhoneCallIcon />
          {post.user?.phone}
        </Button>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between gap-2">
          <Button variant="ghost" onClick={haveToggleSave} className="flex-1">
            <BookmarkIcon className={isSaved ? "fill-current" : ""} />
            {isSaved ? "Bỏ lưu" : "Lưu lại"}
          </Button>

          <Dialog open={openShare} onOpenChange={setOpenShare}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex-1">
                <ShareIcon />
                Chia sẻ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Chia sẻ</DialogTitle>
                <DialogDescription>
                  Chia sẻ đường dẫn bài đăng
                </DialogDescription>
              </DialogHeader>
              <div
                className="rounded-md border p-4 text-gray-400"
                id="share-url"
              >
                {window.location.origin}/posts/{post.id}
              </div>
              <Button type="button" onClick={handleClickCopy}>
                <CopyIcon className="size-4" />
                Sao chép
              </Button>
            </DialogContent>
          </Dialog>

          <Dialog open={openReport} onOpenChange={setOpenReport}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex-1">
                <TriangleAlertIcon />
                Báo xấu
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Báo xấu</DialogTitle>
              </DialogHeader>
              <ReportPost
                post={post}
                onSuccess={() => {
                  setOpenReport(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  )
}
