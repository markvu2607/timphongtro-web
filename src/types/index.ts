import { EPostStatus } from "@/constants"

export type ApiResponseError = {
  statusCode: number
  error: string
  message: string
}

export type QueryParams = {
  limit?: number
  page?: number
  query?: string
}

export type PostQueryParams = QueryParams & {
  provinceId?: string
  districtId?: string
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
}

export type User = {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  isVerified: boolean
}

export type Province = {
  id: string
  name: string
}

export type District = {
  id: string
  name: string
  province: Province
}

export type PostImage = {
  id: string
  url: string
  key: string
}

export type Post = {
  id: string
  title: string
  description: string
  createdAt: string
  publishedAt: string
  thumbnail: string
  address: string
  price: number
  area: number
  longitude: number
  latitude: number
  status: EPostStatus
  district: District
  province: Province
  paymentPackage: PaymentPackage
  user?: User
  postImages: PostImage[]
}

export type PaginatedResponse<T> = {
  items: T[]
  totalPages: number
  total: number
  limit: number
  page: number
}

export type CreatePostPayload = {
  title: string
  description: string
  thumbnail: File
  address: string
  districtId: string
  provinceId: string
  postImages: File[]
}

export type News = {
  id: number
  title: string
  shortDescription: string
  thumbnail: {
    src: string
  }
  content: string
  province?: Province
  publishedAt: string
}

export type PaymentPackage = {
  id: string
  name: string
  description: string
  price: number
  currency: string
}
