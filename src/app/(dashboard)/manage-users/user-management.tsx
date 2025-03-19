'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { UserTable } from './user-table';
import { DisableUserDialog } from './disable-user-dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '../../../components/ui/card';
import useSWR from 'swr';
import { ApiResponse } from '@/lib/apiFetch';
import { Users } from '../../../../types/database';

export function UserManagement() {
  const [users, setUsers] = useState<Users[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userToDisable, setUserToDisable] = useState<(typeof users)[0] | null>(
    null
  );
  const { data } = useSWR<ApiResponse<Users[]>>('/auth/admin/users');

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
    }
  }, [data]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDisableUser = (userId: number) => {
    const userToUpdate = users.find((user) => user.id === userId);
    if (userToUpdate) {
      setUserToDisable(userToUpdate);
    }
  };

  const handleEnableUser = (userId: number) => {
    // Enable user without confirmation
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: 'Active' } : user
      )
    );
  };

  const confirmDisable = () => {
    if (userToDisable) {
      setUsers(
        users.map((user) =>
          user.id === userToDisable.id ? { ...user, status: 'Inactive' } : user
        )
      );
      setUserToDisable(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col gap-2">
          <CardTitle>User Management</CardTitle>
          <CardDescription> Manage all user accounts </CardDescription>
        </div>
        <div className="relative w-64">
          <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <UserTable
          users={filteredUsers}
          onDisableUser={handleDisableUser}
          onEnableUser={handleEnableUser}
        />

        <DisableUserDialog
          user={userToDisable}
          onClose={() => setUserToDisable(null)}
          onConfirm={confirmDisable}
        />
      </CardContent>
    </Card>
  );
}
