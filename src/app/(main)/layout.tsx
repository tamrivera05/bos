'use server';

import { checkAuthenticationStatus } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { MainNav } from '../../components/MainNav/mainNav';

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthenticated = await checkAuthenticationStatus();

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    redirect('/log-in');
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
