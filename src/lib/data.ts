"use server"

import * as userApi from "./api/user.api"
import * as postApi from "./api/post.api"
import * as provinceApi from "./api/province.api"
import * as districtApi from "./api/district.api"
import {
  ApiResponseError,
  District,
  GetPostsResponse,
  Post,
  PostQueryParams,
  Province,
  QueryParams,
} from "@/types"

export const getMe = async () => {
  return userApi.getMe()
}

export const getMyPosts = async (
  queryParams: QueryParams
): Promise<GetPostsResponse | ApiResponseError> => {
  return postApi.getMyPosts(queryParams)
}

export const getPublishedPostById = async (id: string): Promise<Post> => {
  return postApi.getPublishedPostById(id)
}

export const getMyPostById = async (id: string): Promise<Post> => {
  return postApi.getMyPostById(id)
}

export const getAllProvinces = async (): Promise<Province[]> => {
  return provinceApi.getAllProvinces()
}

export const getAllDistricts = async (): Promise<District[]> => {
  return districtApi.getAllDistricts()
}

export const getSavedPost = async (ids: string[]): Promise<Post[]> => {
  return postApi.getPublishedPostListByIds(ids)
}

export const getPublishedPosts = async (
  queryParams: PostQueryParams
): Promise<GetPostsResponse> => {
  return postApi.getPublishedPosts(queryParams)
}
