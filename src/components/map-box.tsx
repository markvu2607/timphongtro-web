"use client"

import { MapPinIcon } from "lucide-react"
import { useEffect, useState } from "react"
import Map, { Marker } from "react-map-gl"

type MapBoxProps = {
  markedPoint?: {
    longitude: number
    latitude: number
  }
}

export const MapBox = ({ markedPoint }: MapBoxProps) => {
  const [canZoom, setCanZoom] = useState<boolean>(false)

  const [viewState, setViewState] = useState({
    longitude: 105.8247682227647,
    latitude: 21.00743990315998,
    zoom: 14,
  })

  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      ...markedPoint,
    }))
  }, [markedPoint])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        setCanZoom(true)
      }
    }

    const handleKeyUp = () => {
      setCanZoom(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      scrollZoom={canZoom}
    >
      {markedPoint && (
        <Marker
          longitude={markedPoint.longitude}
          latitude={markedPoint.latitude}
          anchor="bottom"
        >
          <MapPinIcon className="size-8 text-red-500" />
        </Marker>
      )}
    </Map>
  )
}
