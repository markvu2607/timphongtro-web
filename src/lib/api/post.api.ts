"use server"

import { cookies } from "next/headers"
import * as apiClient from "./api-client"
import { QueryParams } from "@/types"

export const getMyPosts = async (queryParams: QueryParams) =>
  apiClient
    .get(
      `/posts/mine?limit=${queryParams.limit}&page=${queryParams.page}&search=${queryParams.query}`
    )
    .then((data) => data.json())

export const deletePost = async (id: string) => apiClient.del(`/posts/${id}`)

export const createPost = async (formData: FormData) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  return fetch(`${process.env.API_URL}/api/posts`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((data) => data.json())
}

export const updatePost = async (id: string, formData: FormData) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  return fetch(`${process.env.API_URL}/api/posts/${id}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((data) => data.json())
}

export const getPostById = async (id: string) =>
  apiClient.get(`/posts/${id}`).then((data) => data.json())

export const publishPost = async (id: string) =>
  apiClient.post(`/posts/${id}/publish`)

export const closePost = async (id: string) =>
  apiClient.post(`/posts/${id}/close`)

export const getPostListByIds = async (ids: string[]) =>
  apiClient.get(`/posts/list?ids=${ids.join(",")}`).then((data) => data.json())

export const getPosts = async (queryParams: QueryParams) =>
  apiClient
    .get(
      `/posts?limit=${queryParams.limit}&page=${queryParams.page}&search=${queryParams.query}`
    )
    .then((data) => data.json())
