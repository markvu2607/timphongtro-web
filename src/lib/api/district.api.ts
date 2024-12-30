"use server"

import { District } from "@/types"
import * as apiClient from "./api-client"

export const getAllDistricts = async (): Promise<District[]> =>
  apiClient.get("/districts/all").then((data) => data.json())
