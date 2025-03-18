"use client"

import { Button } from "../../../components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlotPickerProps {
  timeSlots: string[]
  selectedTimeSlot?: string
  onSelectTimeSlot: (timeSlot: string) => void
  disabled?: boolean
}

export default function TimeSlotPicker({
  timeSlots,
  selectedTimeSlot,
  onSelectTimeSlot,
  disabled = false
}: TimeSlotPickerProps) {
  if (timeSlots.length === 0) {
    return (
      <div className="text-center p-4 border rounded-md bg-muted">
        <p className="text-sm text-muted-foreground">
          {disabled
            ? "Please select a date first to see available time slots"
            : "No time slots available for the selected date"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {timeSlots.map((timeSlot: string) => (
        <Button
          key={timeSlot}
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "h-9",
            selectedTimeSlot === timeSlot && "bg-[#1F2937] text-primary-foreground hover:bg-[#1F2937]/90",
          )}
          onClick={() => onSelectTimeSlot(timeSlot)}
          disabled={disabled}
        >
          {timeSlot}
        </Button>
      ))}
    </div>
  )
}
