import { verifyEmail } from "@/lib/actions"
import React from "react"

type SearchParams = Promise<{
  token: string
}>

type VerifyEmailPageProps = {
  searchParams: SearchParams
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const { token } = await searchParams

  const error = await verifyEmail(token)

  if (error) {
    throw new Error(error)
  }

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
      <h1 className="mb-4 text-2xl font-bold">Email Verified Successfully</h1>
      <p>You can now close this window and proceed to login.</p>
    </div>
  )
}

export default VerifyEmailPage
