"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type PostSearchFormProps = {
  initialQuery?: string
}

export const PostSearchForm = ({ initialQuery = "" }: PostSearchFormProps) => {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/rooms?query=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for posts..."
        className="grow"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}
