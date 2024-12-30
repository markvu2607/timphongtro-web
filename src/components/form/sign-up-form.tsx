"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/actions"
import { signUpSchema } from "@/lib/schemas"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function SignUpForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const { success, message } = await signUp(data)
    if (!success) {
      toast.error(message)
      return
    }

    toast.success(message)
    router.push("/dashboard/posts")
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Đăng ký</CardTitle>
        <CardDescription>Nhập email của bạn để tạo tài khoản</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      {...field}
                      placeholder="Mật khẩu"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">
                    Xác nhận mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...field}
                      placeholder="Xác nhận mật khẩu"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Tên</FormLabel>
                  <FormControl>
                    <Input id="name" type="text" {...field} placeholder="Tên" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="text"
                      {...field}
                      placeholder="Số điện thoại"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Đăng ký
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <Link href="/auth/sign-in" className="underline">
            Đăng nhập ngay
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
