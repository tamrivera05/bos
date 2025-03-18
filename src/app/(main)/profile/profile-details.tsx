"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import EditProfileModal from "./edit-profile-modal"
import { type EditProfileFormData } from "./edit-profile-schema"

// Mock user data - in a real app, this would come from your database
const initialUserData: EditProfileFormData = {
  basic: {
    birthdate: "1990-01-01",
    gender: "Male",
  },
  contact: {
    contactNumber: "+1 (555) 123-4567",
    email: "user@example.com",
    username: "user123",
  },
  address: {
    street: "123 Main Street",
    city: "Anytown",
    stateProvince: "California",
  },
}

export default function ProfileDetails() {
  const [userData, setUserData] = useState(initialUserData)
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdateProfile = (newData: EditProfileFormData) => {
    setUserData(newData)
    setIsEditing(false)
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-[#1F2937]">Profile Information</CardTitle>
          <Button onClick={() => setIsEditing(true)} className="bg-[#1F2937]">Edit Profile</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#1F2937]">Basic Information</h3>
              <Separator className="my-2" />
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground ">Birthdate</dt>
                  <dd className="text-base">{userData.basic.birthdate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                  <dd className="text-base">{userData.basic.gender}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#1F2937]">Contact Information</h3>
              <Separator className="my-2" />
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Contact Number</dt>
                  <dd className="text-base">{userData.contact.contactNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="text-base">{userData.contact.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Username</dt>
                  <dd className="text-base">{userData.contact.username}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#1F2937]">Address Information</h3>
              <Separator className="my-2" />
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Street</dt>
                  <dd className="text-base">{userData.address.street}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">City</dt>
                  <dd className="text-base">{userData.address.city}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">State/Province/Area</dt>
                  <dd className="text-base">{userData.address.stateProvince}</dd>
                </div>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        userData={userData}
        onUpdate={handleUpdateProfile}
      />
    </>
  )
}
