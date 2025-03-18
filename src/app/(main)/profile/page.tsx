import ProfileDetails from "./profile-details"
import ProfilePicture from "./profile-picture"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10 px-6 max-w-6xl">
      <h1 className="text-3xl font-extrabold mb-8 text-[#1F2937]">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProfilePicture />
        </div>

        <div className="md:col-span-2">
          <ProfileDetails />
        </div>
      </div>
    </div>
  )
}

