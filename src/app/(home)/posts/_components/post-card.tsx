"use client"

import React from "react"

import { Post } from "@/types"

type Props = {
  post: Post
}

export const PostCard = ({ post }: Props) => {
  return <div>{post.title}</div>
}
