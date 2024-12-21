"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, RefreshCcwIcon, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ACCEPTED_IMAGE_TYPES } from "@/constants"
// import { useGeocode } from "@/hooks/use-geocode"
import { createPost } from "@/lib/actions"
import { createPostSchema } from "@/lib/schemas"
import { District, Province } from "@/types"
// import GoogleMap from "./google-map"

type CreatePostFormProps = {
  provinces: Province[]
  districts: District[]
}

export const CreatePostForm = ({
  provinces,
  districts,
}: CreatePostFormProps) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof createPostSchema>>({
    defaultValues: {
      title: "",
      description: "",
      address: "",
      price: 0,
      area: 0,
      provinceId: "",
      districtId: "",
      postImages: [],
    },
    resolver: zodResolver(createPostSchema),
  })

  // const { geocode, refreshGeocode } = useGeocode()

  const onSubmit = async (data: z.infer<typeof createPostSchema>) => {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("address", data.address)
    formData.append("price", data.price.toString())
    formData.append("area", data.area.toString())
    formData.append("provinceId", data.provinceId)
    formData.append("districtId", data.districtId)
    formData.append("longitude", "10.43242")
    formData.append("latitude", "106.7021")
    data.postImages.forEach((image) => {
      formData.append("postImages", image)
    })

    const error = await createPost(formData)
    if (error) {
      toast.error(error)
    } else {
      toast.success("Post created successfully!")
      router.push("/dashboard/posts")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-8 p-4">
          <div className="flex w-2/5 flex-col gap-4 rounded-md border p-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Enter description..."
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input id="address" type="text" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      // onClick={() => refreshGeocode(form.getValues("address"))}
                    >
                      <RefreshCcwIcon />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Giá (VND)</FormLabel>
                  <FormControl>
                    <Input id="price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="area">Diện tích (m²)</FormLabel>
                  <FormControl>
                    <Input id="area" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="provinceId"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="provinceId">Province</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province.id} value={province.id}>
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="districtId"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="districtId">District</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district.id} value={district.id}>
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Controller
              control={form.control}
              name="postImages"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="postImages">Upload Images</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((file, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={96}
                            height={96}
                            className="size-24 rounded-sm object-cover"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="absolute right-1 top-1 size-6"
                            onClick={() => {
                              field.onChange(
                                field.value?.filter((_, i) => i !== index)
                              )
                            }}
                          >
                            <XIcon />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-24"
                        onClick={() => {
                          document.getElementById("postImages")?.click()
                        }}
                      >
                        <PlusIcon className="size-6" />
                      </Button>
                      <Input
                        id="postImages"
                        type="file"
                        multiple
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files
                            ? Array.from(e.target.files)
                            : []
                          field.onChange([...(field.value || []), ...files])
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-3/5">
            {/* TODO: implement google map */}
            {/* <GoogleMap center={geocode || { lat: 10.7761, lng: 106.7021 }} /> */}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/posts"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            {form.formState.isSubmitting
              ? "Creating request..."
              : "Create Request"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
