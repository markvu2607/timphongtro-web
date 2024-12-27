import { getGeocode } from "@/lib/api/map.api"
import { useState } from "react"
import { toast } from "sonner"

type Geocode = {
  longitude: number
  latitude: number
}

export const useGeocode = (defaultValue: Geocode | undefined = undefined) => {
  const [geocode, setGeocode] = useState<Geocode | undefined>(defaultValue)

  const refreshGeocode = async (address: string) => {
    if (!address) {
      setGeocode(undefined)
      return
    }

    try {
      const geocode = await getGeocode(address)
      setGeocode(geocode)
    } catch {
      toast.error("Failed to fetch geocode")
      setGeocode(undefined)
    }
  }

  return { geocode, refreshGeocode }
}
