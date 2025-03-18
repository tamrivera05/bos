"use client"

type TicketStatus = 'open' | 'in-progress' | 'closed'
type TicketPriority = 'high' | 'medium' | 'low'

interface Ticket {
  id: string
  title: string
  description?: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  createdBy: string
}

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Trash2 } from "lucide-react"

// Mock ticket data - in a real app, this would come from an API call
const mockTicketDetails: Ticket = {
  id: "T-1001",
  title: "Cannot access my account",
  description:
    "I'm trying to log in to my account but keep getting an 'Invalid credentials' error even though I'm sure my password is correct. I've tried resetting my password twice but still can't get in.",
  status: "open",
  priority: "high",
  createdAt: "2023-10-15",
  createdBy: "john.doe@example.com",
}

// Mock user data - in a real app, this would come from authentication
const currentUser = {
  email: "admin@example.com",
  role: "admin", // or "user"
}

export default function TicketDetailPage() {
  const [ticket] = useState<Ticket>(mockTicketDetails)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const isAdmin = currentUser.role === "admin"

  // Commented out for frontend development
  // const handleDeleteTicket = () => {
  //   // Simulate API call - in a real app, this would call the DELETE /tickets/{id} endpoint
  //   setTimeout(() => {
  //     router.push("/dashboard")
  //   }, 500)
  // }

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Closed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: TicketPriority) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <Link href="/manage-tickets" className="flex items-center text-muted-foreground hover:text-foreground gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ticket #{ticket.id}</h1>
          <p className="text-muted-foreground mt-1">{ticket.title}</p>
        </div>

        {isAdmin && (
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this ticket?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the ticket.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
              <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Title</h3>
            <p className="text-muted-foreground">{ticket.title}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">{ticket.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Status</h3>
              <div>{getStatusBadge(ticket.status)}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Priority</h3>
              <div>{getPriorityBadge(ticket.priority)}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Created By</h3>
              <p className="text-muted-foreground">{ticket.createdBy}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Created On</h3>
              <p className="text-muted-foreground">{ticket.createdAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
