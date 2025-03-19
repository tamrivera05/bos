"use client"

import type { Person } from "./types"
import PersonCard from "./person-card"

interface OrgChartTabletProps {
  data: Person
}

export default function OrgChartTablet({ data }: OrgChartTabletProps) {
  return (
    <div className="hidden md:block lg:hidden">
      <div className="flex justify-center mb-8">
        <div className="w-64">
          <PersonCard person={data} isRoot />
        </div>
      </div>

      <div className="space-y-8">
        {data.children?.map((group) => (
          <div key={group.id}>
            <div className="bg-muted text-white p-2 rounded-lg font-bold text-center mb-4">{group.name}</div>

            <div className="grid grid-cols-2 gap-4">
              {group.children?.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

