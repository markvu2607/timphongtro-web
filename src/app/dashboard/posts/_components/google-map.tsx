import React from "react"
import {
  GoogleMap as GoogleMapComponent,
  Marker,
  useLoadScript,
} from "@react-google-maps/api"

type Props = {
  center: {
    lat: number
    lng: number
  }
}

const GoogleMap = ({ center }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMapComponent
      zoom={15}
      center={center}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      <Marker position={center} />
    </GoogleMapComponent>
  )
}

export default GoogleMap
