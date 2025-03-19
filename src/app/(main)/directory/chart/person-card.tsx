import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { Person } from "./types"

interface PersonCardProps {
  person: Person
  isRoot?: boolean
}

export default function PersonCard({ person, isRoot = false }: PersonCardProps) {
  if (person.isGroup) return null

  return (
    <Card
      className={`flex items-center overflow-hidden ${
        isRoot ? "bg-background border-black/20" : "bg-muted"
      } rounded-lg shadow-sm border border-black/20 max-w-[280px]`}
    >
      <div className="flex-shrink-0 p-1 rounded-l-lg">
        <div className="relative h-12 w-12 md:h-32 md:w-32 overflow-hidden rounded bg-muted">
          <Image src={person.imageUrl || "/placeholder.svg"} alt={person.name} fill className="object-cover" />
        </div>
      </div>
      <div className="p-2 flex-grow">
        <h3 className={`font-medium text-xs md:text-md text-center ${isRoot ? "text-primary" : ""}`}>{person.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1 text-center">{person.title}</p>
      </div>
    </Card>
  )
}

