import { ApiResponseError } from "@/types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isApiResponseError = (data: any): data is ApiResponseError => {
  return data?.error
}
