"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import TimeSlotPicker from "./time-slot-picker"
import { appointmentsSchema, type AppointmentFormValues } from "./appointments-schema"

// Mock data - would be fetched from API in a real app
const mockServices = [
  { id: "1", name: "Consultation", duration: 30 },
  { id: "2", name: "Follow-up", duration: 45 },
  { id: "3", name: "Review", duration: 60 },
]

export default function AppointmentsForm() {
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
    const form = useForm<AppointmentFormValues>({
      resolver: zodResolver(appointmentsSchema),
      defaultValues: {
        notes: "",
      },
    })
  
    useEffect(() => {
      if (selectedDate) {
        // In a real app, this would be an API call to GET /available-time-slots
        // with the selected date as a parameter
        const mockTimeSlots = [
            "7:00 AM",
            "7:30 AM",
            "8:00 AM",
            "8:30 AM",
          "09:00 AM",
          "09:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "01:00 PM",
          "01:30 PM",
          "02:00 PM",
          "02:30 PM",
          "03:00 PM",
          "03:30 PM",
        ]
        setAvailableTimeSlots(mockTimeSlots)
      } else {
        setAvailableTimeSlots([])
      }
    }, [selectedDate])
  
    const onSubmit = (data: AppointmentFormValues) => {
      // In a real app, this would be an API call to POST /appointments
      console.log("Form data:", data)
      toast.success("Appointment booked", {
        description: `Your appointment has been scheduled for ${format(data.date, "PPP")} at ${data.timeSlot}.`,
      })
      form.reset()
      setSelectedDate(null)
    }
  
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1F2937]">Select Date & Time</CardTitle>
              <CardDescription>Choose an available date and time slot</CardDescription>
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
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date)
                                setSelectedDate(date || null)
                              }}
                              disabled={(date) => {
                                // Disable past dates and weekends in this example
                                return (
                                  date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                  date.getDay() === 0 ||
                                  date.getDay() === 6
                                )
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
                          disabled={!selectedDate}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1F2937]">Service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockServices.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name} ({service.duration} min)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1F2937]">Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any additional information or special requests"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <Button type="submit" className="w-full bg-[#1F2937]">
                    Book Appointment
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1F2937]">Working Hours</CardTitle>
              <CardDescription>Our current operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="font-medium text-[#1F2937]">Monday - Saturday</div>
                  <div className="text-[#1F2937]">7:00 AM - 5:00 PM</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-medium text-[#1F2937]">Sunday</div>
                  <div className="text-[#1F2937]">Closed</div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Appointments are typically 30-60 minutes depending on the service. Please arrive 10 minutes before
                    your scheduled time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    )
}
