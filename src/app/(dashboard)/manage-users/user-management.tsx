'use client';

import { apiFetch, ApiResponse } from '@/lib/apiFetch';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import { Users } from '../../../../types/database';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { DisableUserDialog } from './disable-user-dialog';
import { UserTable } from './user-table';

export function UserManagement() {
  const [users, setUsers] = useState<Users[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userToDisable, setUserToDisable] = useState<(typeof users)[0] | null>(
    null
  );
  const { data, mutate } = useSWR<ApiResponse<Users[]>>('/auth/admin/users');

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

  const confirmDisable = useCallback(async () => {
    if (userToDisable) {
      try {
        // if user is admin then don't disable
        if (userToDisable.is_admin) {
          toast.error('Cannot disable an admin account');

          // Close the dialog
          setUserToDisable(null);
          return;
        }

        await apiFetch(`/auth/admin/users/${userToDisable.id}`, {
          method: 'DELETE'
        });
        toast.success('User account disabled successfully');
        mutate();

        // Close the dialog
        setUserToDisable(null);
      } catch {
        toast.error('Failed to disable user account');
        return;
      }
    }
  }, [mutate, userToDisable]);

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
        <UserTable users={filteredUsers} onDisableUser={handleDisableUser} />

        <DisableUserDialog
          user={userToDisable}
          onClose={() => setUserToDisable(null)}
          onConfirm={confirmDisable}
        />
      </CardContent>
    </Card>
  );
}
