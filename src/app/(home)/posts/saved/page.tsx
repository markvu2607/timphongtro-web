"use client"

import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import * as postApi from "@/lib/api/post.api"
import { Post } from "@/types"
import { PostCard } from "../_components/post-card"

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const savedPostIds: string[] = JSON.parse(
          localStorage.getItem("savedPostIds") || "[]"
        )
        if (savedPostIds.length > 0) {
          const postList = await postApi.getPublishedPostListByIds(savedPostIds)
          setPosts(postList)

          const availableIds = postList.map((post) => post.id)
          const updatedIds: string[] = []
          savedPostIds.forEach((id) => {
            if (availableIds.includes(id)) {
              updatedIds.push(id)
            }
          })
          localStorage.setItem("savedPostIds", JSON.stringify(updatedIds))
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p>Bạn chưa lưu bài đăng nào</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Bài đăng đã lưu</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Page
