"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
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
import { sendVerificationEmail, updateMe } from "@/lib/actions"
import { updateProfileSchema } from "@/lib/schemas"
import { User } from "@/types"
import { UpdateAvatar } from "./update-avatar"

type Props = {
  user: User
}

const UpdateProfileForm = ({ user }: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    defaultValues: {
      name: user.name,
      phone: user.phone,
    },
    resolver: zodResolver(updateProfileSchema),
  })

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    const error = await updateMe(data)
    if (error) {
      toast.error(error)
    } else {
      toast.success("Cập nhật thông tin thành công!")
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <UpdateAvatar avatar={user.avatar} />

        <FormItem className="grid gap-1">
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="bg-gray-100"
              />
              {user.isVerified ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle2Icon className="size-4 text-green-500" />
                </div>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-blue-500"
                  onClick={async () => {
                    const error = await sendVerificationEmail()
                    if (error) {
                      toast.error(error)
                    } else {
                      toast.success(
                        "Đã gửi email xác thực, vui lòng kiểm tra hộp thư!"
                      )
                    }
                  }}
                >
                  Xác thực
                </Button>
              )}
            </div>
          </FormControl>
        </FormItem>

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel htmlFor="name">Tên</FormLabel>
              <FormControl>
                <Input id="name" type="text" placeholder="Tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Số điện thoại"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}

export default UpdateProfileForm
