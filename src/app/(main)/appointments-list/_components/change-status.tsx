import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useApiFetch } from '@/lib/hooks/useApiFetch';
import { MoreHorizontal } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

interface ChangeStatusProps {
  currentStatus: 'pending' | 'approved' | 'cancelled';
  appointmentId: number;
}

const ChangeStatus: FC<ChangeStatusProps> = ({
  currentStatus,
  appointmentId
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const apiFetch = useApiFetch();
  const { mutate } = useSWRConfig();

  const handleClick = useCallback(
    async (status: 'pending' | 'approved' | 'cancelled') => {
      const { error } = await apiFetch(`/appointments/${appointmentId}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });

      if (error) {
        console.log(error);
        setIsLoading(false);
        toast('An error occurred', {
          description:
            'Failed to update the appointment status. Please try again.'
        });
        return;
      }

      // Success case
      setIsLoading(false);
      toast('Appointment updated', {
        description: 'The appointment status has been successfully updated.'
      });

      // Refresh appointments list
      mutate('/appointments');
    },
    [apiFetch, appointmentId, mutate]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto cursor-pointer"
          disabled={isLoading}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={
            currentStatus === 'approved' ||
            currentStatus === 'cancelled' ||
            isLoading
          }
          onClick={() => handleClick('approved')}
        >
          Mark as Confirmed
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={true}
          onClick={() => handleClick('pending')}
        >
          Mark as Pending
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={
            currentStatus === 'cancelled' ||
            currentStatus === 'approved' ||
            isLoading
          }
          onClick={() => handleClick('cancelled')}
        >
          Mark as Cancelled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeStatus;
