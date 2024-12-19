"use server"

import { cookies } from "next/headers"
import * as apiClient from "./api-client"

export const getMe = async () =>
  apiClient.get("/users/me").then((data) => data.json())

export const changeAvatar = async (formData: FormData) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  return fetch(`${process.env.API_URL}/api/users/me/avatar`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((data) => data.json())
}

export const updateMe = async (data: { name: string; phone: string }) =>
  apiClient
    .patch("/users/me", { body: JSON.stringify(data) })
    .then((data) => data.json())
