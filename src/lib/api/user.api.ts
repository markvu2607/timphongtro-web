"use server"

import * as apiClient from "./api-client"

export const getMe = async () =>
  apiClient.get("/users/me").then((data) => data.json())
