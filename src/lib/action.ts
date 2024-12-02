"use server"

import { cookies } from "next/headers"
import * as authApi from "./api/auth.api"
import {
  signInSchema,
  SignInSchema,
  signUpSchema,
  SignUpSchema,
} from "@/lib/schema"

export const signIn = async (
  payload: SignInSchema
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const parsed = signInSchema.safeParse(payload)

    if (!parsed.success) {
      return {
        error: "Form validation failed!",
      }
    }

    const { accessToken, user } = await authApi.signIn(parsed.data)

    if (!accessToken || !user) {
      return {
        error: "Invalid email or password!",
      }
    }

    const cookieStore = await cookies()
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
    })
    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: true,
      sameSite: "lax",
    })

    return {
      success: true,
    }
  } catch {
    return {
      error: "Something went wrong!",
    }
  }
}

export const signUp = async (
  payload: SignUpSchema
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const parsed = signUpSchema.safeParse(payload)

    if (!parsed.success) {
      return {
        error: "Form validation failed!",
      }
    }

    const { accessToken, user } = await authApi.signUp(parsed.data)

    if (!accessToken || !user) {
      return {
        error: "Invalid email or password!",
      }
    }

    const cookieStore = await cookies()
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
    })
    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: true,
      sameSite: "lax",
    })

    return {
      success: true,
    }
  } catch {
    return {
      error: "Something went wrong!",
    }
  }
}
