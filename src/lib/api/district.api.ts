"use server"

import * as apiClient from "./api-client"

export const getAllDistricts = async () =>
  apiClient.get("/districts/all").then((data) => data.json())
