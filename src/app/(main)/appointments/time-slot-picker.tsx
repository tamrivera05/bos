'use client';

import { format } from 'date-fns';
import { Button } from '../../../components/ui/button';
import { cn } from '@/lib/utils';

interface TimeSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot?: string;
  onSelectTimeSlot: (timeSlot: string) => void;
  disabled?: boolean;
}

export default function TimeSlotPicker({
  timeSlots,
  selectedTimeSlot,
  onSelectTimeSlot,
  disabled = false
}: TimeSlotPickerProps) {
  if (timeSlots.length === 0) {
    return (
      <div className="rounded-md border bg-muted p-4 text-center">
        <p className="text-sm text-muted-foreground">
          {disabled
            ? 'Please select a date first to see available time slots'
            : 'No time slots available for the selected date'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {timeSlots.map((timeSlot: TimeSlot) => (
        <Button
          key={`${timeSlot.start_time}-${timeSlot.end_time}`}
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            'h-9',
            selectedTimeSlot === timeSlot.start_time &&
              'bg-[#1F2937] text-primary-foreground hover:bg-[#1F2937]/90',
            !timeSlot.is_available && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => onSelectTimeSlot(timeSlot.start_time)}
          disabled={disabled || !timeSlot.is_available}
        >
          {format(new Date(`2000-01-01T${timeSlot.start_time}`), 'h:mm a')}
        </Button>
      ))}
    </div>
  );
}
