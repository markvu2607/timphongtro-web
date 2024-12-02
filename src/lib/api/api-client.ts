"use server"

import { cookies } from "next/headers"

const customFetch: typeof fetch = async (url, { headers, ...init } = {}) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const headerConfig = {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
  } as HeadersInit

  return fetch(`${process.env.API_URL}/api${url}`, {
    headers: {
      ...headerConfig,
      ...headers,
    },
    ...init,
  })
}

export const get = async (url: string, options: RequestInit = {}) =>
  customFetch(url, { method: "GET", ...options })

export const post = async (url: string, options: RequestInit = {}) =>
  customFetch(url, { method: "POST", ...options })

export const put = async (url: string, options: RequestInit = {}) =>
  customFetch(url, { method: "PUT", ...options })

export const patch = async (url: string, options: RequestInit = {}) =>
  customFetch(url, { method: "PATCH", ...options })

export const del = async (url: string, options: RequestInit = {}) =>
  customFetch(url, { method: "DELETE", ...options })
