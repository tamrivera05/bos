import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useApiFetch } from '@/lib/hooks/useApiFetch';
import { Trash2 } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

interface CancelAppointmentProps {
  appointmentId: number;
}

const CancelAppointment: FC<CancelAppointmentProps> = ({ appointmentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const apiFetch = useApiFetch();
  const { mutate } = useSWRConfig();

  const onDelete = useCallback(
    async (values: number) => {
      setIsLoading(true);

      const { error } = await apiFetch(`/appointments/${values}`, {
        method: 'DELETE'
      });

      if (error) {
        setIsLoading(false);
        return toast('An error occurred', {
          description: 'Failed to delete the appointment. Please try again.'
        });
      }

      // Success case
      setIsLoading(false);
      toast('Appointment deleted', {
        description: 'The appointment has been successfully deleted.'
      });
      // Refresh appointments list
      mutate('/appointments');
    },
    [apiFetch, mutate]
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will cancel your appointment. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            No, keep it
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(appointmentId)}
            disabled={isLoading}
          >
            Yes, cancel it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelAppointment;
