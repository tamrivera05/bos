"use client";

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Directory() {
  // Sample data - replace with your actual data
  const officials = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      position: "Barangay Captain",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Maria Santos",
      position: "Barangay Kagawad - Peace and Order",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Pedro Reyes",
      position: "Barangay Kagawad - Health and Sanitation",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Ana Gonzales",
      position: "Barangay Kagawad - Education",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      name: "Roberto Lim",
      position: "Barangay Kagawad - Infrastructure",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 6,
      name: "Elena Magtanggol",
      position: "Barangay Kagawad - Youth and Sports",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 7,
      name: "Ricardo Dalisay",
      position: "Barangay Kagawad - Senior Citizens",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 8,
      name: "Juana Reyes",
      position: "Barangay Treasurer",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 9,
      name: "Miguel Bautista",
      position: "Barangay Secretary",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const staff = [
    {
      id: 1,
      name: "Rosario Mendoza",
      position: "Administrative Assistant",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Fernando Hidalgo",
      position: "Barangay Tanod Chief",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Lourdes Aquino",
      position: "Health Worker",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Antonio Villanueva",
      position: "Maintenance Staff",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      name: "Carmen Reyes",
      position: "Community Relations Officer",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 6,
      name: "Jose Manalo",
      position: "Barangay Tanod",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="container py-10 mx-auto px-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-[#1F2937]">Barangay Directory</h1>
      <p className="text-muted-foreground text-center mb-8">Meet our dedicated Barangay Officials and Staff members</p>

      <Tabs defaultValue="officials" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="officials" className="font-bold text-md">Barangay Officials</TabsTrigger>
          <TabsTrigger value="staff" className="font-bold text-md">Barangay Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="officials">
          <h2 className="text-2xl font-bold mb-6 text-[#1F2937] ">Barangay Officials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officials.map((official) => (
              <PersonCard key={official.id} person={official} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff">
          <h2 className="text-2xl font-bold mb-6 text-[#1F2937]">Barangay Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((staffMember) => (
              <PersonCard key={staffMember.id} person={staffMember} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PersonCard({ person }: { person: { name: string; position: string; image: string } }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={person.image || "/placeholder.svg"}
          alt={person.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{person.name}</h3>
        <p className="text-muted-foreground">{person.position}</p>
      </CardContent>
    </Card>
  )
}
