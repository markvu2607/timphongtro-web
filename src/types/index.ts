export type QueryParams = {
  limit?: number
  page?: number
  query?: string
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
  thumbnail: string
  address: string
  longitude: number
  latitude: number
  status: string
  district: District
  province: Province
  user?: User
  postImages: PostImage[]
}

export type GetMyPostsResponse = {
  items: Post[]
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