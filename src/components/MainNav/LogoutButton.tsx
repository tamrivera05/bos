"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the Next.js API route for logout
      const response = await fetch('/api/logout', {
        method: 'POST',
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
      console.error("Logout error:", error);
      toast.error('Logout failed');
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 w-full justify-start"
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5" />
      Logout
    </Button>
  );
}
