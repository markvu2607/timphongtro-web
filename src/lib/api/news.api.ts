"use server"

import * as apiClient from "./api-client"

import { News, PaginatedResponse, QueryParams } from "@/types"

export const getPublishedNewsDetail = async (id: string): Promise<News> =>
  apiClient.get(`/news/published/${id}`).then((data) => data.json())

export const getPublishedNewsList = async (
  queryParams: QueryParams
): Promise<PaginatedResponse<News>> =>
  apiClient
    .get(
      `/news/published?limit=${queryParams.limit}&page=${queryParams.page}&search=${queryParams.query}`
    )
    .then((data) => data.json())

export const getRecentPublishedNewsList = async (): Promise<News[]> =>
  apiClient.get("/news/published/recent").then((data) => data.json())
