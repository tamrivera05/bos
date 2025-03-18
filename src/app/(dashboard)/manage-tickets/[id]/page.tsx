'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { apiFetch, ApiResponse } from '@/lib/apiFetch';
import { format } from 'date-fns';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import {
  Ticket,
  TicketPriority,
  TicketStatus
} from '../../../../../types/database';

export default function TicketDetailPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useSWR<ApiResponse<Ticket>>(
    `/tickets/${params.id}`
  );
  const ticket = data?.data;

  const handleDeleteTicket = useCallback(async () => {
    const { error } = await apiFetch(`/tickets/${params.id}`, {
      method: 'DELETE'
    });

    if (error) {
      toast.error('Failed to delete ticket. Please try again.');
      return;
    }

    toast.success('Ticket deleted successfully.');
    router.push('/manage-tickets');
  }, [params.id, router]);

  const getStatusBadge = (status: TicketStatus | undefined) => {
    switch (status) {
      case 'open':
        return (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700"
          >
            Open
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge
            variant="outline"
            className="border-yellow-200 bg-yellow-50 text-yellow-700"
          >
            In Progress
          </Badge>
        );
      case 'resolved':
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            Closed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: TicketPriority | undefined) => {
    switch (priority) {
      case 'high':
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-700"
          >
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge
            variant="outline"
            className="border-orange-200 bg-orange-50 text-orange-700"
          >
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <Link
          href="/manage-tickets"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          {isLoading ? (
            <>
              <Skeleton className="mb-1 h-8 w-48" />
              <Skeleton className="h-5 w-64" />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold tracking-tight">
                Ticket #T-{ticket && ticket.id.toString().padStart(4, '0')}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {ticket && ticket.title}
              </p>
            </>
          )}
        </div>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this ticket?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                ticket.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteTicket()}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium">Title</h3>
            {isLoading ? (
              <Skeleton className="h-5 w-3/4" />
            ) : (
              <p className="text-muted-foreground">{ticket && ticket.title}</p>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">Description</h3>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-4/6" />
              </div>
            ) : (
              <p className="whitespace-pre-line text-muted-foreground">
                {ticket && ticket.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-medium">Status</h3>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <div>{getStatusBadge(ticket?.status)}</div>
              )}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Priority</h3>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <div>{getPriorityBadge(ticket?.priority)}</div>
              )}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Created By</h3>
              {isLoading ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                <p className="text-muted-foreground">
                  {ticket && ticket.user.email}
                </p>
              )}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Created On</h3>
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : (
                <p className="text-muted-foreground">
                  {ticket &&
                    format(new Date(ticket.created_at), 'MMMM dd, yyyy')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
