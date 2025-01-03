"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/actions"
import { signInSchema } from "@/lib/schemas"
import { z } from "zod"
export function SignInForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  })
  const [serverError, setServerError] = useState<string | undefined>(undefined)

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setServerError(undefined)

    const result = await signIn(data)
    if (result.success) {
      toast.success("Đăng nhập thành công!")
      router.push("/dashboard/posts")
    }
    if (result.error) {
      setServerError(result.error)
    }
  }

  const handleInputChange = () => {
    if (serverError) {
      setServerError(undefined)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
        <CardDescription>
          Nhập email của bạn để đăng nhập vào tài khoản
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                onChange={(e) => {
                  register("email").onChange(e)
                  handleInputChange()
                }}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mật khẩu"
                {...register("password")}
                onChange={(e) => {
                  register("password").onChange(e)
                  handleInputChange()
                }}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {serverError && (
              <p className="rounded-sm bg-red-50 p-1 text-sm text-red-500">
                {serverError}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Đăng nhập
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Bạn chưa có tài khoản?{" "}
          <Link href="/auth/sign-up" className="underline">
            Đăng ký ngay
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
