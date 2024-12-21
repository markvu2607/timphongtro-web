"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

import {
  reportPostSchema,
  signInSchema,
  signUpSchema,
  updateProfileSchema,
} from "@/lib/schemas"
import * as authApi from "./api/auth.api"
import * as postApi from "./api/post.api"
import * as userApi from "./api/user.api"
import * as reportApi from "./api/report.api"

export const signIn = async (
  payload: z.infer<typeof signInSchema>
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
    cookieStore.set("user", JSON.stringify(user))

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
  payload: z.infer<typeof signUpSchema>
): Promise<{ success: boolean; message: string }> => {
  try {
    const parsed = signUpSchema.safeParse(payload)

    if (!parsed.success) {
      return {
        success: false,
        message: "Form validation failed!",
      }
    }

    delete parsed.data.confirmPassword
    const { accessToken, user } = await authApi.signUp(parsed.data)

    if (!accessToken || !user) {
      return {
        success: false,
        message: "Invalid email or password!",
      }
    }

    const cookieStore = await cookies()
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
    })
    cookieStore.set("user", JSON.stringify(user))

    return {
      success: true,
      message: "Signed up successfully!",
    }
  } catch {
    return {
      success: false,
      message: "Something went wrong!",
    }
  }
}

export const signOut = async () => {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  cookieStore.delete("user")
}

export const deletePost = async (id: string) => {
  await postApi.deletePost(id)
  revalidatePath("/dashboard/posts")
}

export const createPost = async (formData: FormData) => {
  try {
    await postApi.createPost(formData)
  } catch {
    return "Something went wrong!"
  }
}

export const updatePost = async (formData: FormData) => {
  const id: string = formData.get("id") as string
  formData.delete("id")
  try {
    await postApi.updatePost(id, formData)
  } catch {
    return "Something went wrong!"
  }
}

export const publishPost = async (id: string) => {
  await postApi.publishPost(id)
  revalidatePath("/dashboard/posts")
}

export const closePost = async (id: string) => {
  await postApi.closePost(id)
  revalidatePath("/dashboard/posts")
}

export const updateMe = async (data: z.infer<typeof updateProfileSchema>) => {
  try {
    await userApi.updateMe(data)
  } catch {
    return "Something went wrong!"
  }
}

export const changeAvatar = async (formData: FormData) => {
  try {
    await userApi.changeAvatar(formData)
  } catch {
    return "Something went wrong!"
  }
}

export const sendVerificationEmail = async () => {
  const res = await authApi.sendVerificationEmail()
  if (res.error) {
    return "Something went wrong!"
  }
}

export const verifyEmail = async (token: string) => {
  const res = await authApi.verifyEmail({ token })
  if (res.error) {
    return "Something went wrong!"
  }
}

export const reportPost = async (data: z.infer<typeof reportPostSchema>) => {
  const res = await reportApi.reportPost(data)
  if (res.error) {
    return "Something went wrong!"
  }
}
