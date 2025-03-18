import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (
  status: 'pending' | 'approved' | 'cancelled'
) => {
  switch (status) {
    case 'approved':
      return <Badge className="bg-green-500">Confirmed</Badge>;
    case 'pending':
      return (
        <Badge variant="outline" className="border-yellow-600 text-yellow-600">
          Pending
        </Badge>
      );
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};
