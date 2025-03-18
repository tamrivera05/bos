'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import useSWR from 'swr';
import { getStatusBadge } from './_components/appointment-badge';
import CancelAppointment from './_components/cancel-appointment';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  street_address: string;
  city: string;
  province: string;
  birth_date: string;
  contact_number: string;
  gender: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface Appointment {
  id: number;
  user_id: number;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: 'pending' | 'approved' | 'cancelled';
  created_at: string;
  updated_at: string;
  user: User;
}

interface AppointmentResponse {
  success: boolean;
  message: string;
  data: Appointment[];
}

const AppointmentList = () => {
  const { data: appointments, error } =
    useSWR<AppointmentResponse>('/appointments');

  if ((appointments && appointments.data.length === 0) || error) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium">No appointments found</h3>
        <p className="mt-2 text-muted-foreground">
          Book a new appointment to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {appointments &&
        appointments.data.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle>
                  #{appointment.id.toString().padStart(4, '0')}
                </CardTitle>
                {getStatusBadge(appointment.status)}
              </div>
              <CardDescription>{appointment.user.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(
                      new Date(appointment.appointment_date),
                      'MMMM d, yyyy'
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(
                      new Date(`1970-01-01T${appointment.appointment_time}`),
                      'hh:mm aa'
                    )}
                  </span>
                </div>
                <div className="pt-2 text-sm text-muted-foreground">
                  <p>{appointment.reason}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <CancelAppointment appointmentId={appointment.id} />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default AppointmentList;
