"use client"

import AppointmentsForm from "./appointments-form"

export default function Appointments () {
    return (
        <div className="container mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-[#1F2937]">Book an Appointment</h1>
                <p className="text-muted-foreground">Select a date, time, and service to schedule your appointment</p>
            </div>
            <AppointmentsForm />
        </div>
    )
}