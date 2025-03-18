"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import AppointmentList from "./appointmentList"

interface Appointment {
  id: string
  date: string
  time: string
  status: string
  service: string
  notes: string
}

// Mock data - would be fetched from API in a real app
const mockAppointments: Appointment[] = [
  {
    id: "1",
    date: "2025-03-20",
    time: "10:00 AM",
    status: "confirmed",
    service: "Consultation",
    notes: "Initial consultation",
  },
  {
    id: "2",
    date: "2025-03-25",
    time: "2:30 PM",
    status: "pending",
    service: "Follow-up",
    notes: "Follow-up appointment",
  },
  {
    id: "3",
    date: "2025-04-05",
    time: "11:15 AM",
    status: "cancelled",
    service: "Review",
    notes: "Quarterly review",
  },
]

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    setAppointments(mockAppointments)
  }, [])

  const handleDeleteAppointment = (id: string) => {
    // In a real app, this would be an API call
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
    toast("Appointment deleted", {
      description: "The appointment has been successfully deleted.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937]">My Appointments</h1>
          <p className="text-muted-foreground">Manage your appointments and schedule</p>
        </div>
        <Link href="/appointments">
          <Button className="bg-[#1F2937]">
            <Calendar className="mr-2 h-4 w-4" />
            Book New Appointment
          </Button>
        </Link>
      </div>

          <AppointmentList
            appointments={appointments}
            onDelete={handleDeleteAppointment}
          />
    </div>
  )
}
