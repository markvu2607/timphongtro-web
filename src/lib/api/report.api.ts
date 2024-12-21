"use server"

import { z } from "zod"

import { reportPostSchema } from "../schemas"
import * as apiClient from "./api-client"

export const reportPost = async (payload: z.infer<typeof reportPostSchema>) =>
  apiClient
    .post("/reports", { body: JSON.stringify(payload) })
    .then((data) => data.json())
