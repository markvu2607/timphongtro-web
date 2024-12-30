"use client"

export const getGeocode = async (
  address: string
): Promise<{ longitude: number; latitude: number } | undefined> => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  const response = await fetch(url).then((data) => data.json())

  const result = response.features[0]
  if (result) {
    const [longitude, latitude] = result.geometry.coordinates
    return { longitude, latitude }
  }

  return undefined
}
