'use server';

import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import AppointmentList from './appointmentList';

const Appointment = async () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937]">
            My Appointments
          </h1>
          <p className="text-muted-foreground">
            Manage your appointments and schedule
          </p>
        </div>
        <Link href="/appointments">
          <Button className="bg-[#1F2937]">
            <Calendar className="mr-2 h-4 w-4" />
            Book New Appointment
          </Button>
        </Link>
      </div>

      <AppointmentList />
    </div>
  );
};

export default Appointment;
