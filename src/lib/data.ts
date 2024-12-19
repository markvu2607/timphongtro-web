"use server"

import * as userApi from "./api/user.api"
import * as postApi from "./api/post.api"
import * as provinceApi from "./api/province.api"
import * as districtApi from "./api/district.api"
import { GetMyPostsResponse, QueryParams } from "@/types"

export const getMe = async () => {
  return userApi.getMe()
}

export const getMyPosts = async (
  queryParams: QueryParams
): Promise<GetMyPostsResponse> => {
  return postApi.getMyPosts(queryParams)
}

export const getPostById = async (id: string) => {
  return postApi.getPostById(id)
}

export const getAllProvinces = async () => {
  return provinceApi.getAllProvinces()
}

export const getAllDistricts = async () => {
  return districtApi.getAllDistricts()
}
