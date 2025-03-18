'use server';

import { ApiResponse } from '@/lib/apiFetch';
import { checkAuthenticationStatus } from '@/lib/auth';
import { serverApiFetch } from '@/lib/serverApiFetch';
import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { User } from '../../../types/database';
import { MainNav } from '../../components/MainNav/mainNav';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthenticated = await checkAuthenticationStatus();

  if (!isAuthenticated) {
    redirect('/log-in');
  }

  // check if admin
  const { data } = await serverApiFetch<ApiResponse<User>>('/user');
  const isAdmin = data?.data?.user.role === 'admin';

  if (!isAdmin) notFound();

  return (
    <div className="relative flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
