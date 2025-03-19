"use client"

import type { Person } from "./types"
import PersonCard from "./person-card"

interface OrgChartDesktopProps {
  data: Person
}

export default function OrgChartDesktop({ data }: OrgChartDesktopProps) {
  return (
    <div className="hidden lg:block relative">
      <div className="flex justify-center mb-12">
        <div className="w-64">
          <PersonCard person={data} isRoot />
        </div>
      </div>

      <div className="relative">
        {/* Connecting line from CEO to branches */}
        <div className="absolute left-1/2 top-0 w-0.5 h-12 bg-gray-300 -translate-x-1/2"></div>

        {/* Horizontal line connecting branches */}
        <div className="absolute left-1/4 right-1/4 top-12 h-0.5 bg-gray-300"></div>

        {/* Vertical lines to each branch */}
        <div className="absolute left-1/4 top-12 w-0.5 h-8 bg-gray-300 -translate-x-1/2"></div>
        <div className="absolute right-1/4 top-12 w-0.5 h-8 bg-gray-300 translate-x-1/2"></div>

        <div className="flex justify-between pt-20">
          {data.children?.map((group) => (
            <div key={group.id} className="w-[48%]">
              <div className="bg-emerald-500 text-white p-2 rounded-lg font-bold text-center mb-6">{group.name}</div>

              <div className="grid grid-cols-1 gap-6">
                {group.children?.map((person, index) => (
                  <div key={person.id} className="relative">
                    {index > 0 && (
                      <div className="absolute left-1/2 -top-6 w-0.5 h-6 bg-gray-300 -translate-x-1/2"></div>
                    )}
                    <PersonCard person={person} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

