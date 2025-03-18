'use client';

import { ArrowLeft, Check, Clock, FileText, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { apiFetch } from '@/lib/apiFetch';
import { toast } from 'sonner';
import useSWR from 'swr';
import { DocumentStatus } from '../../../../../types/database';

// Types for our document requests

interface DocumentRequest {
  id: string;
  fullName: string;
  address: string;
  email: string;
  birthdate: string;
  contactNumber: string;
  documentType: string;
  purpose: string;
  status: DocumentStatus;
}

export default function DocumentRequestDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split('/').pop();
  const [document, setDocument] = useState<DocumentRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data, mutate } = useSWR(`/documents/${id}`);

  useEffect(() => {
    if (data) {
      const doc = data.data;
      const formattedDoc: DocumentRequest = {
        id: doc.id,
        fullName: doc.full_name || 'Unknown',
        address: doc.address || 'N/A',
        email: doc.email || 'N/A',
        birthdate: doc.date_of_birth || 'N/A',
        contactNumber: doc.contact_number || 'N/A',
        documentType: doc.type || 'N/A',
        purpose: doc.purpose || 'N/A',
        status: doc.status || 'open'
      };

      setDocument(formattedDoc);
      setIsLoading(false);
    }
  }, [data]);

  // Update document status (using mock data)
  const updateDocumentStatus = async (status: DocumentStatus) => {
    const { error } = await apiFetch(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });

    if (error) {
      return toast.error('Failed to update status');
    }

    // success
    toast.success('Status Updated');
    mutate();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status badge
  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'open':
        return (
          <Badge
            variant="outline"
            className="border-yellow-200 bg-yellow-50 text-yellow-700"
          >
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case 'delivered':
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            <Check className="mr-1 h-3 w-3" /> Approved
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-700"
          >
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center py-6">
        <div className="text-center">
          <Clock className="mx-auto mb-4 h-8 w-8 animate-spin text-muted-foreground" />
          <p>Loading document request details...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Document Requests
        </Button>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">
              Document Request Not Found
            </h2>
            <p className="mb-6 text-muted-foreground">
              The document request you're looking for doesn't exist or you don't
              have permission to view it.
            </p>
            <Button onClick={() => router.push('/documents')}>
              View All Document Requests
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Document Requests
      </Button>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
              <div>
                <CardTitle>{document.fullName}'s Document Request</CardTitle>
                <CardDescription>{document.documentType}</CardDescription>
              </div>
              {getStatusBadge(document.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Full Name
                  </h3>
                  <p>{document.fullName}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Email
                  </h3>
                  <p>{document.email}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Address
                  </h3>
                  <p>{document.address}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Contact Number
                  </h3>
                  <p>{document.contactNumber}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Birthdate
                  </h3>
                  <p>{formatDate(document.birthdate)}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Document Type
                  </h3>
                  <p>{document.documentType}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Purpose
                  </h3>
                  <p>{document.purpose}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Request ID
                  </h3>
                  <p className="font-mono text-sm">
                    doc-{document.id.toString().padStart(4, '0')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-between pt-6">
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={
                    document.status === 'delivered' ? 'default' : 'default'
                  }
                  size="sm"
                  onClick={() => updateDocumentStatus('delivered')}
                  disabled={
                    document.status === 'delivered' ||
                    document.status === 'cancelled'
                  }
                  className="bg-[#1F2937]"
                >
                  <Check className="mr-1 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant={
                    document.status === 'cancelled' ? 'default' : 'destructive'
                  }
                  size="sm"
                  onClick={() => updateDocumentStatus('cancelled')}
                  disabled={
                    document.status === 'cancelled' ||
                    document.status === 'delivered'
                  }
                >
                  <X className="mr-1 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  variant={document.status === 'open' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateDocumentStatus('open')}
                  disabled={true}
                >
                  <Clock className="mr-1 h-4 w-4" />
                  Mark Pending
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
