'use server';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApiResponse } from '@/lib/apiFetch';
import { serverApiFetch } from '@/lib/serverApiFetch';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { User } from '../../../../types/database';
import AppointmentList from './appointmentList';

const Appointment = async () => {
  const { data } = await serverApiFetch<ApiResponse<User>>('/user');
  const isAdmin = data?.data?.user.role === 'admin';

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
        {isAdmin === false && (
          <Link href="/appointments">
            <Button className="bg-[#1F2937]">
              <Calendar className="mr-2 h-4 w-4" />
              Book New Appointment
            </Button>
          </Link>
        )}
      </div>

      <Tabs defaultValue={'appointments'} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="appointments">
            {isAdmin ? 'All Appointments' : 'My Appointments'}
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="working-hours">Working Hours</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="appointments">
          <AppointmentList isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointment;
