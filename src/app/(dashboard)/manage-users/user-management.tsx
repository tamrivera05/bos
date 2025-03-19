"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "../../../components/ui/input"
import { UserTable } from "./user-table"
import { DisableUserDialog } from "./disable-user-dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"

// Mock user data
const initialUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "5 mins ago",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "Active",
    lastActive: "Just now",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [userToDisable, setUserToDisable] = useState<(typeof users)[0] | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDisableUser = (userId: string) => {
    const userToUpdate = users.find((user) => user.id === userId)
    if (userToUpdate) {
      setUserToDisable(userToUpdate)
    }
  }

  const handleEnableUser = (userId: string) => {
    // Enable user without confirmation
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "Active" } : user)))
  }

  const confirmDisable = () => {
    if (userToDisable) {
      setUsers(users.map((user) => (user.id === userToDisable.id ? { ...user, status: "Inactive" } : user)))
      setUserToDisable(null)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col gap-2">
        <CardTitle>User Management</CardTitle>
        <CardDescription> Manage all user accounts </CardDescription>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <UserTable users={filteredUsers} onDisableUser={handleDisableUser} onEnableUser={handleEnableUser} />

        <DisableUserDialog user={userToDisable} onClose={() => setUserToDisable(null)} onConfirm={confirmDisable} />
      </CardContent>
    </Card>
  )
}

