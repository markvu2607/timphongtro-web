"use server"

import { z } from "zod"
import { signInSchema, signUpSchema } from "../schemas"
import * as apiClient from "./api-client"
export const signIn = async (payload: z.infer<typeof signInSchema>) =>
  apiClient
    .post("/auth/sign-in", { body: JSON.stringify(payload) })
    .then((data) => data.json())

export const signUp = async (payload: z.infer<typeof signUpSchema>) =>
  apiClient
    .post("/auth/sign-up", { body: JSON.stringify(payload) })
    .then((data) => data.json())

export const verifyEmail = async (payload: { token: string }) =>
  apiClient
    .post("/auth/verify-email", { body: JSON.stringify(payload) })
    .then((data) => data.json())

export const sendVerificationEmail = async () => {
  return apiClient
    .post("/auth/send-verification-email")
    .then((data) => data.json())
}
