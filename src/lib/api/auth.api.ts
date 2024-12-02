"use server"

import * as apiClient from "./api-client"
import { SignInSchema, SignUpSchema } from "../schema"

export const signIn = async (payload: SignInSchema) =>
  apiClient
    .post("/auth/sign-in", { body: JSON.stringify(payload) })
    .then((data) => data.json())

export const signUp = async (payload: SignUpSchema) =>
  apiClient
    .post("/auth/sign-up", { body: JSON.stringify(payload) })
    .then((data) => data.json())
