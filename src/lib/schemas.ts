import { z } from "zod"

import { ACCEPTED_IMAGE_TYPES } from "@/constants"
import { MAX_FILE_SIZE } from "@/constants"

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const signUpSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string().optional(),
    name: z
      .string({ required_error: "Name is required" })
      .min(5, "Name is required"),
    phone: z.string({ required_error: "Phone number is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const createPostSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  address: z.string({ required_error: "Address is required" }),
  price: z.number({ required_error: "Price is required" }),
  area: z.number({ required_error: "Area is required" }),
  provinceId: z.string({ required_error: "Province is required" }),
  districtId: z.string({ required_error: "District is required" }),
  postImages: z
    .array(
      z
        .custom<File>()
        .refine((file) => file instanceof File, {
          message: "Please upload at least one image",
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maximum file size is 5MB",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: "Only .jpg, .jpeg, .png and .webp files are accepted",
        })
    )
    .min(1, "At least one file is required")
    .max(10, "Maximum 10 files are allowed"),
})

export const editPostSchema = z.object({
  id: z.string({ required_error: "Id is required" }),
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  address: z.string({ required_error: "Address is required" }),
  price: z.number({ required_error: "Price is required" }),
  area: z.number({ required_error: "Area is required" }),
  provinceId: z.string({ required_error: "Province is required" }),
  districtId: z.string({ required_error: "District is required" }),
  existingPostImages: z.array(
    z.object({ id: z.string(), url: z.string(), key: z.string() })
  ),
  postImages: z
    .array(
      z
        .custom<File>()
        .refine((file) => file instanceof File, {
          message: "Please upload at least one image",
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maximum file size is 5MB",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: "Only .jpg, .jpeg, .png and .webp files are accepted",
        })
    )
    .max(10, "Maximum 10 files are allowed")
    .optional(),
})

export const updateProfileSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  phone: z.string({ required_error: "Phone number is required" }),
})

export const reportPostSchema = z.object({
  postId: z.string({ required_error: "Post ID is required" }),
  reason: z.string({ required_error: "Reason is required" }),
  description: z.string(),
  name: z.string({ required_error: "Name is required" }),
  phone: z.string({ required_error: "Phone number is required" }),
})

export const postSearchParamsSchema = z.object({
  provinceId: z.string().optional(),
  districtId: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minArea: z.number().optional(),
  maxArea: z.number().optional(),
})
