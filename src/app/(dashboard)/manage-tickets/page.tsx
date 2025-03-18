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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, MoreHorizontal, Search } from "lucide-react"

// Mock data for tickets
const mockTickets: Ticket[] = [
  {
    id: "T-1001",
    title: "Cannot access my account",
    status: "open",
    priority: "high",
    createdAt: "2023-10-15",
    createdBy: "john.doe@example.com",
  },
  {
    id: "T-1002",
    title: "Payment failed",
    status: "in-progress",
    priority: "medium",
    createdAt: "2023-10-14",
    createdBy: "jane.smith@example.com",
  },
  {
    id: "T-1003",
    title: "Feature request: Dark mode",
    status: "open",
    priority: "low",
    createdAt: "2023-10-13",
    createdBy: "alex.johnson@example.com",
  },
  {
    id: "T-1004",
    title: "Error when uploading files",
    status: "closed",
    priority: "high",
    createdAt: "2023-10-10",
    createdBy: "sarah.williams@example.com",
  },
  {
    id: "T-1005",
    title: "Missing order confirmation",
    status: "in-progress",
    priority: "medium",
    createdAt: "2023-10-09",
    createdBy: "mike.brown@example.com",
  },
]

// Mock user data - in a real app, this would come from authentication
const currentUser = {
  email: "admin@example.com",
  role: "admin", // or "user"
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<TicketStatus[]>([])
  const isAdmin = currentUser.role === "admin"

  // Filter tickets based on search query and status filter
  const filteredTickets = mockTickets.filter((ticket) => {
    // Text search filter
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.createdBy.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(ticket.status)

    return matchesSearch && matchesStatus
  })

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

  const toggleStatusFilter = (status: TicketStatus) => {
    setStatusFilter((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1F2937]">Tickets</h1>
          <p className="text-muted-foreground mt-1">
            Manage all support tickets
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Tickets</CardTitle>
          <CardDescription>
            {isAdmin ? "View and manage all support tickets from users" : "View and manage your support tickets"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" mb-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tickets..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("open")}
                    onCheckedChange={() => toggleStatusFilter("open")}
                  >
                    Open
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("in-progress")}
                    onCheckedChange={() => toggleStatusFilter("in-progress")}
                  >
                    In Progress
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("closed")}
                    onCheckedChange={() => toggleStatusFilter("closed")}
                  >
                    Closed
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                {isAdmin && <TableHead>Created By</TableHead>}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 7 : 6} className="text-center py-8 text-muted-foreground">
                    No tickets found. Create a new ticket to get started.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <Link href={`/tickets/${ticket.id}`} className="hover:underline">
                        {ticket.title}
                      </Link>
                    </TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{ticket.createdAt}</TableCell>
                    {isAdmin && <TableCell>{ticket.createdBy}</TableCell>}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/manage-tickets/${ticket.id}`}>View Details</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
