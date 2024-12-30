"use client"

import Image from "next/image"
import React from "react"

const gridClassname = [
  "col-span-2 row-span-2 aspect-square",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1 aspect-square",
  "col-span-1 row-span-1 aspect-square",
]

type QuiltedImagesProps = {
  images: string[]
  onClick?: (index: number) => void
}

export const QuiltedImages = ({ images, onClick }: QuiltedImagesProps) => {
  const showedImages = images.map((image, index) => ({
    url: image,
    className: gridClassname[index],
  }))

  return (
    <div className="grid w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-md">
      {showedImages.map((image, index) => (
        <div key={image.url} className={`${image.className} relative`}>
          <Image
            src={image.url}
            alt={image.url}
            fill
            className="object-cover"
            onClick={() => onClick?.(index)}
          />
        </div>
      ))}
    </div>
  )
}
