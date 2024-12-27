"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDebounceCallback } from "usehooks-ts"
import { z } from "zod"

import { MapBox } from "@/components/map-box"
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
import { useGeocode } from "@/hooks/use-geocode"
import { createPost } from "@/lib/actions"
import { createPostSchema } from "@/lib/schemas"
import { District, PaymentPackage, Province } from "@/types"

type CreatePostFormProps = {
  provinces: Province[]
  districts: District[]
  paymentPackages: PaymentPackage[]
}

export const CreatePostForm = ({
  provinces,
  districts,
  paymentPackages,
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
      paymentPackageId: "",
      postImages: [],
    },
    resolver: zodResolver(createPostSchema),
  })

  const { geocode, refreshGeocode } = useGeocode()

  const debouncedRefreshGeocode = useDebounceCallback((address: string) => {
    refreshGeocode(address)
  }, 1000)

  const onSubmit = async (data: z.infer<typeof createPostSchema>) => {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("address", data.address)
    formData.append("price", data.price.toString())
    formData.append("area", data.area.toString())
    formData.append("provinceId", data.provinceId)
    formData.append("districtId", data.districtId)
    formData.append("paymentPackageId", data.paymentPackageId)
    if (!geocode) {
      toast.error("Please enter a valid address!")
      return
    }
    formData.append("longitude", geocode.longitude.toString())
    formData.append("latitude", geocode.latitude.toString())
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
          <div className="flex w-3/5 flex-col gap-4 rounded-md border p-4">
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
                      rows={20}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2 space-y-2">
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          id="address"
                          type="text"
                          className="text-ellipsis"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value)
                            debouncedRefreshGeocode(e.target.value)
                          }}
                        />
                      </FormControl>
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
                      <Input
                        id="price"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                      <Input
                        id="area"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="provinceId"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormLabel htmlFor="provinceId">Tỉnh/Thành phố</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          form.setValue("districtId", "")
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tỉnh/thành phố" />
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
                  <FormItem className="flex-1 space-y-2">
                    <FormLabel htmlFor="districtId">Quận/Huyện</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!form.watch("provinceId")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quận/huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts
                            .filter(
                              (district) =>
                                district.province.id ===
                                form.watch("provinceId")
                            )
                            .map((district) => (
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
            <FormField
              control={form.control}
              name="paymentPackageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="paymentPackageId">Gói tin</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn gói tin">
                          {paymentPackages.find(
                            (paymentPackage) =>
                              paymentPackage.id === field.value
                          )?.name || ""}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {paymentPackages.map((paymentPackage) => (
                          <SelectItem
                            key={paymentPackage.id}
                            value={paymentPackage.id}
                            className=""
                          >
                            <p className="font-bold">
                              {paymentPackage.name}
                              &nbsp; &nbsp;
                              <span className="text-xs text-gray-500">
                                {paymentPackage.price.toLocaleString()}
                                &nbsp;
                                {paymentPackage.currency}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              {paymentPackage.description}
                            </p>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

          <div className="h-[500px] w-2/5">
            <MapBox markedPoint={geocode} />
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
