"use client"

import { ChangeEvent, useState } from "react"
import Image from "next/image"

import { changeAvatar } from "@/lib/actions"

type UpdateAvatarProps = {
  avatar: string | undefined
}

export const UpdateAvatar = ({ avatar }: UpdateAvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    avatar || "/default-avatar.png"
  )
  const [isUploading, setIsUploading] = useState(false)

  const handleImageClick = () => {
    // Programmatically trigger file input click
    document.getElementById("avatar-upload")?.click()
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("avatar", file)
      await changeAvatar(formData)
      const objectUrl = URL.createObjectURL(file)
      setAvatarUrl(objectUrl)
    } catch (error) {
      console.error("Error updating avatar:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="relative cursor-pointer overflow-hidden rounded-full"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
      >
        <Image
          src={avatarUrl}
          alt="User avatar"
          width={100}
          height={100}
          className="object-cover transition-opacity hover:opacity-80"
        />
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <div className="text-white">Uploading...</div>
          </div>
        )}
      </div>
      <input
        type="file"
        id="avatar-upload"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
        disabled={isUploading}
      />
    </div>
  )
}
