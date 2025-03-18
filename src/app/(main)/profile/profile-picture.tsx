"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Camera } from "lucide-react"

export default function ProfilePicture() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=300&width=300")
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
      setObjectUrl(imageUrl)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div
          className="relative mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
            <Image src={profileImage || "/placeholder.svg"} alt="Profile Picture" fill className="object-cover" />
            {isHovering && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <label htmlFor="profile-picture-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center text-white">
                    <Camera className="h-8 w-8 mb-2" />
                    <span>Change Photo</span>
                  </div>
                </label>
              </div>
            )}
          </div>

          <input
            id="profile-picture-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}
