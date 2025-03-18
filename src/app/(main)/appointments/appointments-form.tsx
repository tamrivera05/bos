'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useApiFetch } from '@/lib/hooks/useApiFetch';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
import {
  appointmentsSchema,
  type AppointmentFormValues
} from './appointments-schema';
import TimeSlotPicker from './time-slot-picker';
import WorkingHours from './working-hours';

interface TimeSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export default function AppointmentsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data: timeSlotsResponse } = useSWR<{
    success: boolean;
    data: TimeSlot[];
  }>(
    selectedDate
      ? `/available-time-slots?date=${format(selectedDate, 'yyyy-MM-dd')}`
      : null
  );

  const availableTimeSlots = timeSlotsResponse?.data || [];

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentsSchema),
    defaultValues: {
      notes: ''
    }
  });

  const apiFetch = useApiFetch();

  const onSubmit: SubmitHandler<AppointmentFormValues> = useCallback(
    async (values) => {
      try {
        setIsSubmitting(true);

        console.log(
          JSON.stringify({
            appointment_date: format(values.date, 'yyyy-MM-dd'),
            appointment_time: values.timeSlot
              ? format(new Date(`1970-01-01T${values.timeSlot}`), 'HH:mm')
              : '',
            reason: values.notes || ''
          })
        );

        if (!values.date || !values.timeSlot) {
          toast.error('Please select both date and time');
          return;
        }

        const { error } = await apiFetch('/appointments', {
          method: 'POST',
          body: JSON.stringify({
            appointment_date: format(values.date, 'yyyy-MM-dd'),
            appointment_time: values.timeSlot
              ? format(new Date(`1970-01-01T${values.timeSlot}`), 'HH:mm')
              : '',
            reason: values.notes || ''
          })
        });

        if (error) {
          toast.error('Failed to submit ticket', {
            description: error.message
          });
          return;
        }

        setIsSuccess(true);
        toast.success('Appointment booked', {
          description: `Your appointment has been scheduled for ${format(values.date, 'PPP')} at ${values.timeSlot}.`
        });

        // Reset form after successful submission
        setTimeout(() => {
          form.reset();
          setIsSuccess(false);
          setSelectedDate(null);
        }, 2000);
      } catch (error) {
        toast.error('An unexpected error occurred');
        console.error('Ticket submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [apiFetch, form]
  );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1F2937]">Select Date & Time</CardTitle>
          <CardDescription>
            Choose an available date and time slot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[#1F2937]">Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            disabled={isSubmitting || isSuccess}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setSelectedDate(date || null);
                          }}
                          disabled={(date) => {
                            // Disable past dates and weekends in this example
                            return (
                              date <
                                new Date(new Date().setHours(0, 0, 0, 0)) ||
                              date.getDay() === 0 ||
                              date.getDay() === 6
                            );
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1F2937]">Time Slot</FormLabel>
                    <TimeSlotPicker
                      timeSlots={availableTimeSlots}
                      selectedTimeSlot={field.value}
                      onSelectTimeSlot={field.onChange}
                      disabled={!selectedDate || isSubmitting || isSuccess}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1F2937]">Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional information or special requests"
                        className="resize-none"
                        disabled={isSubmitting || isSuccess}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#1F2937]"
                disabled={isSubmitting || isSuccess}
              >
                Book Appointment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <WorkingHours />
    </div>
  );
}
