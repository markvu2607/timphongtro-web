import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import { User } from "@/types"

export const useUser = () => {
  const updateUser = () => {
    const userFromCookie = Cookies.get("user")
    if (userFromCookie) {
      try {
        const parsedUser = JSON.parse(userFromCookie)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data from cookie:", error)
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    updateUser()
  }, [])

  return { user }
}
