"use client"

import { LogsIcon } from "lucide-react"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import { Button } from "@/components/ui/button"
import { PostImage } from "@/types"
import { QuiltedImages } from "./quilted-images"

type PostImagesProps = {
  postImages: PostImage[]
}

export const PostImages = ({ postImages }: PostImagesProps) => {
  const [index, setIndex] = useState(-1)
  const images = postImages.map((image) => image.url)

  return (
    <div className="relative" id="#gallery">
      <QuiltedImages
        images={images.slice(0, 4)}
        onClick={(index: number) => setIndex(index)}
      />
      <Button
        variant="outline"
        className="absolute bottom-4 right-8 border-black bg-white"
        onClick={() => setIndex(0)}
      >
        <LogsIcon className="size-4" />
        Hiển thị tất cả
      </Button>
      <Lightbox
        index={index}
        slides={postImages.map((image) => ({
          src: image.url,
        }))}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </div>
  )
}
