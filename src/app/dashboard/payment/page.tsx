import { Button } from "@/components/ui/button"
import { MoveLeftIcon } from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <svg
        className="mb-4 size-16 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
      <h1 className="mb-4 text-2xl font-bold">Thanh toán thành công</h1>
      <Link href="/dashboard/posts">
        <Button variant="ghost">
          <MoveLeftIcon className="size-4" />
          Quay lại
        </Button>
      </Link>
    </div>
  )
}
