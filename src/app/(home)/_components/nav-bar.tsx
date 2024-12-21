"use client"

import { BookMarkedIcon, PenLineIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/actions"
import logoSrc from "@/app/icon.png"

const routes = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Phòng trọ",
    href: "/posts",
  },
  {
    name: "Tin tức",
    href: "/news",
  },
]

export const Navbar = () => {
  const { user } = useUser()

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[80px] bg-white shadow-lg">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-12 px-4">
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image alt="logo" src={logoSrc} width={52} height={52} priority />
          </Link>
        </div>

        <div className="flex flex-1 gap-6">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <p>{route.name}</p>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/posts/saved">
            <Button variant="ghost">
              <BookMarkedIcon className="size-4" />
              Bài đăng đã lưu
            </Button>
          </Link>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="size-8">
                    <AvatarImage src={user.avatar || "/default-avatar.png"} />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard/posts">Quản lý bài đăng</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard/profile">Thông tin cá nhân</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      className="cursor-pointer"
                      onClick={async () => {
                        await signOut()
                        window.location.href = "/"
                      }}
                    >
                      Đăng xuất
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href={"/dashboard/posts/create"}>
                <Button>
                  <PenLineIcon className="size-4" />
                  Đăng tin
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/sign-up">
                <Button variant="secondary">Đăng ký</Button>
              </Link>
              <Link href="/auth/sign-in">
                <Button type="button">Đăng nhập</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
