import { notFound } from "next/navigation"

import { getPublishedPostById } from "@/lib/data"
import { Owner } from "../_components/owner"
import { PostDetails } from "../_components/post-details"
import { PostImages } from "../_components/post-images"

type Params = Promise<{ id: string }>

type PageProps = {
  params: Params
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  const post = await getPublishedPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
      <PostImages postImages={post.postImages} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PostDetails post={post} />
        </div>
        <div className="lg:col-span-1">
          <Owner post={post} />
        </div>
      </div>
    </div>
  )
}
