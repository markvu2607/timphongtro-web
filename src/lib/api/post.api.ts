"use server"

import { cookies } from "next/headers"
import * as apiClient from "./api-client"
import { PostQueryParams, QueryParams } from "@/types"

export const getMyPosts = async (queryParams: QueryParams) =>
  apiClient
    .get(
      `/posts/mine?limit=${queryParams.limit}&page=${queryParams.page}&search=${queryParams.query}`
    )
    .then((data) => data.json())

export const deletePost = async (id: string) =>
  apiClient.del(`/posts/mine/${id}`)

export const createPost = async (formData: FormData) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  return fetch(`${process.env.API_URL}/api/posts/mine`, {
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

  return fetch(`${process.env.API_URL}/api/posts/mine/${id}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((data) => data.json())
}

export const getMyPostById = async (id: string) =>
  apiClient.get(`/posts/mine/${id}`).then((data) => data.json())

export const publishPost = async (id: string) =>
  apiClient.post(`/posts/mine/${id}/publish`)

export const closePost = async (id: string) =>
  apiClient.post(`/posts/mine/${id}/close`)

export const getPublishedPostListByIds = async (ids: string[]) =>
  apiClient
    .get(`/posts/published/list?ids=${ids.join(",")}`)
    .then((data) => data.json())

export const getPublishedPosts = async (queryParams: PostQueryParams) => {
  const params = new URLSearchParams()
  if (queryParams.limit) params.append("limit", queryParams.limit.toString())
  if (queryParams.page) params.append("page", queryParams.page.toString())
  if (queryParams.query) params.append("search", queryParams.query)
  if (queryParams.provinceId)
    params.append("provinceId", queryParams.provinceId)
  if (queryParams.districtId)
    params.append("districtId", queryParams.districtId)
  if (queryParams.minPrice)
    params.append("minPrice", queryParams.minPrice.toString())
  if (queryParams.maxPrice)
    params.append("maxPrice", queryParams.maxPrice.toString())
  if (queryParams.minArea)
    params.append("minArea", queryParams.minArea.toString())
  if (queryParams.maxArea)
    params.append("maxArea", queryParams.maxArea.toString())
  const queryString = params.toString()

  return apiClient
    .get(`/posts/published?${queryString}`)
    .then((data) => data.json())
}

export const getPublishedPostById = async (id: string) =>
  apiClient.get(`/posts/published/${id}`).then((data) => data.json())
