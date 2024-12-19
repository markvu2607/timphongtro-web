import { getGeocode } from "@/lib/api/map.api"
import { useState } from "react"
import { toast } from "sonner"

export const useGeocode = () => {
  const [geocode, setGeocode] = useState<{ lat: number; lng: number } | null>(
    null
  )

  const refreshGeocode = async (address: string) => {
    try {
      const geocode = await getGeocode(address)
      setGeocode(geocode)
    } catch {
      toast.error("Failed to fetch geocode")
      setGeocode(null)
    }
  }

  return { geocode, refreshGeocode }
}
