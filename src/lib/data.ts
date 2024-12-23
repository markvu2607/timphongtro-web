"use server"

import * as userApi from "./api/user.api"
import * as postApi from "./api/post.api"
import * as provinceApi from "./api/province.api"
import * as districtApi from "./api/district.api"
import { ApiResponseError, GetPostsResponse, Post, QueryParams } from "@/types"

export const getMe = async () => {
  return userApi.getMe()
}

export const getMyPosts = async (
  queryParams: QueryParams
): Promise<GetPostsResponse | ApiResponseError> => {
  return postApi.getMyPosts(queryParams)
}

export const getPostById = async (id: string): Promise<Post> => {
  return postApi.getPostById(id)
}

export const getAllProvinces = async () => {
  return provinceApi.getAllProvinces()
}

export const getAllDistricts = async () => {
  return districtApi.getAllDistricts()
}

export const getSavedPost = async (ids: string[]): Promise<Post[]> => {
  return postApi.getPostListByIds(ids)
}

export const getPosts = async (
  queryParams: QueryParams
): Promise<GetPostsResponse> => {
  return postApi.getPosts(queryParams)
}
