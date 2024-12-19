"use client"

export const getGeocode = async (
  address: string
): Promise<{ lat: number; lng: number } | null> => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`

  const response = await fetch(url).then((data) => data.json())

  if (!response.ok) {
    throw new Error("Failed to fetch geocode")
  }

  const result = response.results[0]

  if (result) {
    const { lat, lng } = result.geometry.location
    return { lat, lng }
  }

  return null
}
