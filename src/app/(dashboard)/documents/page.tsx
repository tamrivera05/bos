'use client';

import type React from 'react';

import {
  Check,
  Clock,
  FileText,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ApiResponse } from '@/lib/apiFetch';
import { toast } from 'sonner';
import useSWR from 'swr';
import { Document, DocumentStatus } from '../../../../types/database';

interface DocumentRequest {
  id: number;
  fullName: string;
  address: string;
  email: string;
  birthdate: string;
  contactNumber: string;
  documentType: string;
  purpose: string;
  status: DocumentStatus;
}

export default function DocumentRequestsAdmin() {
  const [documents, setDocuments] = useState<DocumentRequest[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<DocumentRequest[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentRequest | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const router = useRouter();

  const { data } = useSWR<ApiResponse<Document[]>>('/documents');

  useEffect(() => {
    if (data?.data) {
      const formattedDocs = data.data.map((doc) => ({
        id: doc.id,
        fullName: doc.full_name || 'Unknown',
        address: doc.address || 'N/A',
        email: doc.email || 'N/A',
        birthdate: doc.date_of_birth || 'N/A',
        contactNumber: doc.contact_number || 'N/A',
        documentType: doc.type || 'N/A',
        purpose: doc.purpose || 'N/A',
        status: doc.status || 'open'
      }));

      setDocuments(formattedDocs);
      setFilteredDocuments(formattedDocs);
    }
    setIsLoading(false);
  }, [data]);

  // Update document status (using mock data)
  const updateDocumentStatus = async (id: number, status: DocumentStatus) => {
    // Simulate API delay
    setIsLoading(true);
    setTimeout(() => {
      // Update local state
      const updatedDocs = documents.map((doc) =>
        doc.id === id ? { ...doc, status } : doc
      );
      setDocuments(updatedDocs);

      // Apply filters again
      applyFilters(searchQuery, statusFilter, updatedDocs);

      toast.success('Status Updated');
      setIsLoading(false);
    }, 500);
  };

  // Apply filters based on search query and status
  const applyFilters = (query: string, status: string, docs = documents) => {
    let filtered = docs;

    // Apply search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.fullName.toLowerCase().includes(lowercaseQuery) ||
          doc.documentType.toLowerCase().includes(lowercaseQuery) ||
          doc.purpose.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter((doc) => doc.status === status);
    }

    setFilteredDocuments(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, statusFilter);
  };

  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(searchQuery, value);
  };

  // Open update dialog
  const openUpdateDialog = (document: DocumentRequest) => {
    setSelectedDocument(document);
    setIsUpdateDialogOpen(true);
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

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-[#1F2937]">
          Document Requests
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Document Requests</CardTitle>
          <CardDescription>
            Review and update the status of document requests from users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, document type or purpose..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <FileText className="mx-auto mb-4 h-12 w-12" />
              <h3 className="text-lg font-medium">
                No document requests found
              </h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requested by</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        {doc.fullName}
                      </TableCell>
                      <TableCell>{doc.documentType}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openUpdateDialog(doc)}
                            >
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/documents/${doc.id}`)
                              }
                            >
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Document Status</DialogTitle>
            <DialogDescription>
              Change the status for document request by:{' '}
              {selectedDocument?.fullName}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Current Status</h3>
              <div>
                {selectedDocument && getStatusBadge(selectedDocument.status)}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">New Status</h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    if (selectedDocument) {
                      updateDocumentStatus(selectedDocument.id, 'delivered');
                      setIsUpdateDialogOpen(false);
                    }
                  }}
                >
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  Approve Request
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    if (selectedDocument) {
                      updateDocumentStatus(selectedDocument.id, 'cancelled');
                      setIsUpdateDialogOpen(false);
                    }
                  }}
                >
                  <X className="mr-2 h-4 w-4 text-red-600" />
                  Reject Request
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    if (selectedDocument) {
                      updateDocumentStatus(selectedDocument.id, 'open');
                      setIsUpdateDialogOpen(false);
                    }
                  }}
                >
                  <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                  Mark as Pending
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
