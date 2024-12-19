"use server"

import * as apiClient from "./api-client"

export const getAllProvinces = async () =>
  apiClient.get("/provinces/all").then((data) => data.json())
