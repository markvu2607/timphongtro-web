"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { RotateCcwIcon, SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { postSearchParamsSchema } from "@/lib/schemas"
import { District, Province } from "@/types"

type PostSearchFormProps = {
  provinces: Province[]
  districts: District[]
}

export const PostSearchForm = ({
  provinces,
  districts,
}: PostSearchFormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof postSearchParamsSchema>>({
    defaultValues: {
      provinceId: searchParams.get("provinceId") || "",
      districtId: searchParams.get("districtId") || "",
      minPrice: parseFloat(searchParams.get("minPrice") || "0") / 1000000,
      maxPrice: parseFloat(searchParams.get("maxPrice") || "0") / 1000000,
      minArea: parseInt(searchParams.get("minArea") || "0"),
      maxArea: parseInt(searchParams.get("maxArea") || "0"),
    },
    resolver: zodResolver(postSearchParamsSchema),
  })

  const onSubmit = (data: z.infer<typeof postSearchParamsSchema>) => {
    const params = new URLSearchParams()
    if (data.provinceId) {
      params.set("provinceId", data.provinceId)
    }
    if (data.districtId) {
      params.set("districtId", data.districtId)
    }
    if (data.minPrice) {
      params.set("minPrice", (data.minPrice * 1000000).toString())
    }
    if (data.maxPrice) {
      params.set("maxPrice", (data.maxPrice * 1000000).toString())
    }
    if (data.minArea) {
      params.set("minArea", data.minArea.toString())
    }
    if (data.maxArea) {
      params.set("maxArea", data.maxArea.toString())
    }

    router.push(`/posts?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end justify-between gap-8"
      >
        <FormField
          control={form.control}
          name="provinceId"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-1">
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
            <FormItem className="flex-1 space-y-1">
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
                          district.province.id === form.watch("provinceId")
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
        <div>
          <FormLabel>Giá (triệu đồng)</FormLabel>
          <div className="flex items-center gap-x-1">
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem className="flex items-baseline gap-x-1 space-y-1">
                  <FormLabel htmlFor="minPrice">Từ</FormLabel>
                  <FormControl className="space-y-0">
                    <Input
                      type="text"
                      {...field}
                      placeholder="0"
                      className="w-[60px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem className="flex items-baseline gap-x-1 space-y-1">
                  <FormLabel htmlFor="maxPrice">-</FormLabel>
                  <FormControl className="space-y-0">
                    <Input
                      type="text"
                      {...field}
                      placeholder="0"
                      className="w-[60px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <Label>Diện tích (m²)</Label>
          <div className="flex items-center gap-x-1">
            <FormField
              control={form.control}
              name="minArea"
              render={({ field }) => (
                <FormItem className="flex items-baseline gap-x-1 space-y-1">
                  <FormLabel htmlFor="minArea">Từ</FormLabel>
                  <FormControl className="space-y-0">
                    <Input
                      className="w-[80px]"
                      type="number"
                      placeholder="0"
                      min={0}
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value))
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxArea"
              render={({ field }) => (
                <FormItem className="flex items-baseline gap-x-1 space-y-1">
                  <FormLabel htmlFor="maxArea">-</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[80px]"
                      type="number"
                      placeholder="0"
                      min={0}
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value))
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={() => {
              router.push("/posts")
              form.reset()
            }}
          >
            <RotateCcwIcon className="size-4" />
          </Button>
          <Button className="flex items-center gap-1" type="submit">
            <SearchIcon className="size-4" />
            Tìm kiếm
          </Button>
        </div>
      </form>
    </Form>
  )
}
