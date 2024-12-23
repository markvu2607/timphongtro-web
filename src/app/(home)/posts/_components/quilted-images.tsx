import Image from "next/image"
import React from "react"

import { PostImage } from "@/types"

const gridClassname = [
  "col-span-2 row-span-2 aspect-square",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1 aspect-square",
  "col-span-1 row-span-1 aspect-square",
]

type QuiltedImagesProps = {
  images: PostImage[]
}

export const QuiltedImages = ({ images }: QuiltedImagesProps) => {
  const showedImages = images.map((image, index) => ({
    ...image,
    className: gridClassname[index],
  }))

  return (
    <div className="grid w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-md">
      {showedImages.map((image) => (
        <div key={image.id} className={`${image.className} relative`}>
          <Image src={image.url} alt={image.url} fill />
        </div>
      ))}
    </div>
  )
}
