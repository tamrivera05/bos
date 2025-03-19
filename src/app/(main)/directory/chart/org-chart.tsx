"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import PersonCard from "./person-card"
import type { Person } from "./types"
import { Button } from "@/components/ui/button"

export default function OrgChart() {
  const [isMobile, setIsMobile] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "MGA KAGAWAD": true,
    "MGA STAFF": true,
  })

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setExpandedGroups({
          "MGA KAGAWAD": false,
          "MGA STAFF": false,
        })
      } else {
        setExpandedGroups({
          "MGA KAGAWAD": true,
          "MGA STAFF": true,
        })
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const organizationData: Person = {
    id: "1",
    name: "Katherine Eleonore M. Mayo",
    title: "Punong Barangay",
    imageUrl: "/Kapitana.png",
    children: [
      {
        id: "2",
        name: "MGA KAGAWAD",
        title: "",
        isGroup: true,
        children: [
          {
            id: "3",
            name: "Romeo M. Giron Jr.",
            title: "Brgy. Kagawad - LIVELIHOOD",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "4",
            name: "Ronaldo E. Macalintal",
            title: "Brgy. Kagawad - CLEAN & GREEN",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "5",
            name: "Gemma G. Concepcion",
            title: "Brgy. Kagawad - SOCIAL CONCERN & SENIOR CITIZEN",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "6",
            name: "Wilfredo V. Jingco",
            title: "Brgy. Kagawad - HEALTH & EDUCATION",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "7",
            name: "Wilbert M. Hilario",
            title: "Brgy. Kagawad - PEACE & ORDER",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "8",
            name: "Shirley G. Padilla",
            title: "Brgy. Kagawad - BUDGET & FINANCE",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "9",
            name: "Rogelio D. Padilla",
            title: "Brgy. Kagawad - INFRASTRUCTURE",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "10",
            name: "Jasiane Amsterdam Andres",
            title: "SK Chairwoman",
            imageUrl: "/Caloocan_City.png",
          },
        ],
      },
      {
        id: "11",
        name: "MGA STAFF",
        title: "",
        isGroup: true,
        children: [
          {
            id: "12",
            name: "Odessa O. Ongsing",
            title: "Secretary",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "13",
            name: "Teodulo M. Tilaon Jr.",
            title: "Treasurer",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "14",
            name: "Maria Arlene Florinsa N. Cruz",
            title: "VAWC",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "15",
            name: "Arnold Z. Nicolas",
            title: "Administrator",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "16",
            name: "Austine Valorie Manlielic",
            title: "Bhw",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "17",
            name: "Teresita R. Borces",
            title: "Bhw",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "18",
            name: "Sonny Mojico",
            title: "Street Sweeper",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "19",
            name: "Leonora M. Mamaril",
            title: "Caretaker",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "20",
            name: "Alexander Marcu",
            title: "Executive Officer",
            imageUrl: "/Caloocan_City.png",
          },
          {
            id: "21",
            name: "Romy T. Magtaya",
            title: "Deputy",
            imageUrl: "/Caloocan_City.png",
          },
        ],
      },
    ],
  }

  // Adjust the mobile view to be more compact
  const renderMobileView = () => {
    return (
      <div className="w-full">
        <PersonCard person={organizationData} isRoot />

        {organizationData.children?.map((group) => (
          <div key={group.id} className="mt-4">
            <Button
              onClick={() => toggleGroup(group.name)}
              variant="outline"
              className="w-full flex items-center justify-between p-2 text-sm"
            >
              {group.name}
              {expandedGroups[group.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>

            {expandedGroups[group.name] && (
              <div className="mt-2 space-y-2 pl-2">
                {group.children?.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Adjust the spacing and layout to make everything more compact
  const renderDesktopView = () => {
    return (
      <div className="relative">
        <div className="flex justify-center mb-6">
          <PersonCard person={organizationData} isRoot />
        </div>

        <div className="relative">
          {/* Connecting line from top to branches */}
          <div className="absolute left-1/2 top-0 w-0.5 h-6 bg-[#1F2937]/50 -translate-x-1/2"></div>

          {/* Horizontal line connecting branches */}
          <div className="absolute left-1/4 right-1/4 top-6 h-0.5 bg-[#1F2937]/50"></div>

          {/* Vertical lines to each branch */}
          <div className="absolute left-1/4 top-6 w-0.5 h-6 bg-[#1F2937]/50 -translate-x-1/2"></div>
          <div className="absolute right-1/4 top-6 w-0.5 h-6 bg-[#1F2937]/50 translate-x-1/2"></div>

          <div className="flex justify-between pt-12">
            {/* Left side - MGA KAGAWAD */}
            <div className="w-[48%]">
              <div className="bg-muted text-foreground p-1 rounded-lg font-bold text-center mb-3 text-md border border-black/20">
                {organizationData.children?.[0].name}
              </div>

              <div className="relative">
                {/* Vertical line down the middle */}
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-[#1F2937]/50 -translate-x-1/2"></div>

                {/* Staggered layout for KAGAWAD */}
                {organizationData.children?.[0].children?.map((person, index) => (
                  <div
                    key={person.id}
                    className={`relative mb-2 ${index % 2 === 0 ? "ml-auto mr-[52%]" : "ml-[52%] mr-auto"}`}
                  >
                    {/* Horizontal connector line */}
                    <div
                      className={`absolute top-1/2 ${index % 2 === 0 ? "left-full" : "right-full"} w-[8%] h-0.5 bg-[#1F2937]/50`}
                    ></div>
                    <PersonCard person={person} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - MGA STAFF */}
            <div className="w-[48%]">
              <div className="bg-muted text-foreground p-1 rounded-lg font-bold text-center mb-3 text-md border border-black/20">
                {organizationData.children?.[1].name}
              </div>

              <div className="relative">
                {/* Vertical line down the middle */}
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-[#1F2937]/50 -translate-x-1/2"></div>

                {/* Staggered layout for STAFF */}
                {organizationData.children?.[1].children?.map((person, index) => (
                  <div
                    key={person.id}
                    className={`relative mb-2 ${index % 2 === 0 ? "ml-auto mr-[52%]" : "ml-[52%] mr-auto"}`}
                  >
                    {/* Horizontal connector line */}
                    <div
                      className={`absolute top-1/2 ${index % 2 === 0 ? "left-full" : "right-full"} w-[8%] h-0.5 bg-[#1F2937]/50`}
                    ></div>
                    <PersonCard person={person} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Reduce padding in the container
  return (
    <div className="bg-background p-3 md:p-4 rounded-lg border border-black/20 shadow-sm">
      {isMobile ? renderMobileView() : renderDesktopView()}
    </div>
  )
}

