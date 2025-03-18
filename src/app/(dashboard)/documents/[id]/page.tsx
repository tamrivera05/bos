"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Check, Clock, FileText, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner";

// Types for our document requests
type DocumentStatus = "pending" | "approved" | "rejected"

interface DocumentRequest {
  id: string
  fullName: string
  address: string
  email: string
  birthdate: string
  contactNumber: string
  documentType: string
  purpose: string
  status: DocumentStatus
}

// Mock data for document requests
const mockDocuments: Record<string, DocumentRequest> = {
  "doc-001": {
    id: "doc-001",
    fullName: "John Smith",
    address: "123 Main St, Anytown, PH",
    email: "john.smith@email.com",
    birthdate: "1990-01-15",
    contactNumber: "09123456789",
    documentType: "Barangay Clearance",
    purpose: "Employment requirement",
    status: "pending"
  },
  "doc-002": {
    id: "doc-002",
    fullName: "Sarah Johnson",
    address: "456 Oak Ave, Somewhere, PH",
    email: "sarah.j@email.com",
    birthdate: "1985-03-22",
    contactNumber: "09187654321",
    documentType: "Business Permit",
    purpose: "Store opening requirement",
    status: "approved"
  },
  "doc-003": {
    id: "doc-003",
    fullName: "Michael Chen",
    address: "789 Pine St, Elsewhere, PH",
    email: "mchen@email.com",
    birthdate: "1995-11-08",
    contactNumber: "09198765432",
    documentType: "Barangay ID",
    purpose: "Personal identification",
    status: "rejected"
  }
}

export default function DocumentRequestDetail() {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname?.split('/').pop()
  const [document, setDocument] = useState<DocumentRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch document request details (using mock data)
  const fetchDocumentDetails = async (documentId: string) => {
    setIsLoading(true)
    // Simulate API delay
    setTimeout(() => {
      const doc = mockDocuments[documentId]
      setDocument(doc || null)
      setIsLoading(false)
    }, 800)
  }

  // Update document status (using mock data)
  const updateDocumentStatus = async (status: DocumentStatus) => {
    setIsLoading(true)
    // Simulate API delay
    setTimeout(() => {
      // Update local state
      if (document) {
        const updatedDoc = { ...document, status }
        setDocument(updatedDoc)
        // Also update in our mock data store
      if (document && mockDocuments[document.id]) {
          mockDocuments[document.id] = updatedDoc
        }
      }

      toast.success("Status Updated",)
      setIsLoading(false)
    }, 500)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get status badge
  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="mr-1 h-3 w-3" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Load document details on component mount
  useEffect(() => {
    if (id) {
      fetchDocumentDetails(id)
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p>Loading document request details...</p>
        </div>
      </div>
    )
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
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Document Request Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The document request you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Button onClick={() => router.push("/documents")}>View All Document Requests</Button>
          </CardContent>
        </Card>
      </div>
    )
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Full Name</h3>
                  <p>{document.fullName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Email</h3>
                  <p>{document.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Address</h3>
                  <p>{document.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Number</h3>
                  <p>{document.contactNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Birthdate</h3>
                  <p>{formatDate(document.birthdate)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Document Type</h3>
                  <p>{document.documentType}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Purpose</h3>
                  <p>{document.purpose}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Request ID</h3>
                  <p className="font-mono text-sm">{document.id}</p>
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
                  variant={document.status === "approved" ? "default" : "default"}
                  size="sm"
                  onClick={() => updateDocumentStatus("approved")}
                  disabled={document.status === "approved"}
                  className="bg-[#1F2937]"
                >
                  <Check className="mr-1 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant={document.status === "rejected" ? "default" : "destructive"}
                  size="sm"
                  onClick={() => updateDocumentStatus("rejected")}
                  disabled={document.status === "rejected"}
                >
                  <X className="mr-1 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  variant={document.status === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateDocumentStatus("pending")}
                  disabled={document.status === "pending"}
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
  )
}
