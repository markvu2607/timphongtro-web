"use client"

import { PowerIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { signOut } from "@/lib/actions"
import logoSrc from "@/app/icon.png"
import NavLinks from "./nav-links"
import Image from "next/image"

export default function SideNav() {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-40 items-end justify-start overflow-hidden rounded-md"
        href="/"
      >
        <div className="relative size-full">
          <Image src={logoSrc} alt="logo" fill className="object-cover" />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          onClick={async () => {
            await signOut()
            router.replace("/")
          }}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Đăng xuất</div>
        </button>
      </div>
    </div>
  )
}
