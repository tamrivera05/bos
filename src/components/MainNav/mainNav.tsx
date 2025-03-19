'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUserStore } from '@/stores/user-store';
import { Calendar, File, LogOut, Menu, Ticket, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

const navItems = [
  { name: 'Directory', href: '/directory' },
  { name: 'Archive', href: '/archive' },
  { name: 'Appointments', href: '/appointments' },
  { name: 'Submission of Ticket', href: '/tickets' }
];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the Next.js API route for logout
      const response = await fetch('/api/logout', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear client-side auth data
      localStorage.removeItem('authToken');
      useUserStore.getState().setUser(null);

      // Show success message and redirect
      toast.success('Logout successful');
      router.push('/log-in');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/directory" className="flex items-center">
            <span className="text-3xl font-extrabold text-[#1F2937]">BOS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-[#4e688c]"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="pb-2 font-bold">
                  {user?.name}
                </Link>
              </DropdownMenuItem>
              {user?.role === 'admin' && (
                <>
                  <div className="px-2">
                    <Separator orientation="horizontal" />
                    <span className="text-[10px] font-semibold text-[#9F9F9F] uppercase">
                      {' '}
                      Administrator Tools
                    </span>
                  </div>
                  <DropdownMenuItem asChild>
                    <div className="flex-col items-start">
                      <div className="flex items-center justify-items-start gap-2">
                        <File className="h-5 w-5" />
                        <Link href="/documents"> Manage Documents </Link>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <div className="flex-col items-start">
                      <div className="flex items-center justify-items-start gap-2">
                        <Ticket className="h-5 w-5" />
                        <Link href="/manage-tickets"> Manage Tickets </Link>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <div className="px-2 pb-2">
                    <Separator orientation="horizontal" />
                  </div>
                </>
              )}
              <DropdownMenuItem asChild>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <Link href="/appointments-list">Appointments</Link>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild={true}>
                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer flex-col items-start"
                >
                  <div className="flex items-center justify-items-start gap-2">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </div>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="mx-6 my-12 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
