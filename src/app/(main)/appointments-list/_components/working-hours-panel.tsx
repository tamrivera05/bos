'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { WorkingHours } from '../../../../../types/database';
import { useApiFetch } from '@/lib/hooks/useApiFetch';
import { useSWRConfig } from 'swr';

interface WorkingHoursPanelProps {
  workingHours: WorkingHours;
}

const WorkingHoursPanel: FC<WorkingHoursPanelProps> = ({
  workingHours: intialWorkingHours
}) => {
  const [workingHours, setWorkingHours] = useState({
    start: intialWorkingHours.start_time,
    end: intialWorkingHours.end_time
  });
  const [isEditing, setIsEditing] = useState(false);
  const apiFetch = useApiFetch();
  const { mutate } = useSWRConfig();

  // Update the handleTimeChange function to not worry about isOpen property
  const handleTimeChange = (field: string, value: string) => {
    setWorkingHours({
      ...workingHours,
      [field]: value
    });
  };

  const handleSave = async () => {
    const { error } = await apiFetch('/working-hours', {
      method: 'PUT',
      body: JSON.stringify({
        start_time: workingHours.start,
        end_time: workingHours.end
      })
    });

    if (error) {
      return toast('Error', {
        description: 'There was an error updating the working hours.'
      });
    }

    toast('Working hours updated', {
      description: 'The working hours have been successfully updated.'
    });
    setIsEditing(false);
    mutate('/working-hours');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        {/* In the CardHeader section, update the button text */}
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Working Hours</CardTitle>
            <CardDescription>
              Set your business hours for appointments
            </CardDescription>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Edit Business Hours
            </Button>
          )}
        </div>
      </CardHeader>
      {/* Replace the entire CardContent section with this: */}
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-3">
              <Label className="font-medium">Everyday</Label>
            </div>
            <div className="col-span-4">
              {isEditing ? (
                <Input
                  type="time"
                  value={workingHours.start}
                  onChange={(e) => handleTimeChange('start', e.target.value)}
                />
              ) : (
                <div>{workingHours.start}</div>
              )}
            </div>
            <div className="col-span-1 text-center">to</div>
            <div className="col-span-4">
              {isEditing ? (
                <Input
                  type="time"
                  value={workingHours.end}
                  onChange={(e) => handleTimeChange('end', e.target.value)}
                />
              ) : (
                <div>{workingHours.end}</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default WorkingHoursPanel;
