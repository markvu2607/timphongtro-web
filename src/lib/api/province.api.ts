"use server"

import { Province } from "@/types"
import * as apiClient from "./api-client"

export const getAllProvinces = async (): Promise<Province[]> =>
  apiClient.get("/provinces/all").then((data) => data.json())
