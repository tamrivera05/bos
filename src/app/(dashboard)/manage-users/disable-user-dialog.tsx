'use client';

import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../../components/ui/dialog';

interface DisableUserDialogProps {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DisableUserDialog({
  user,
  onClose,
  onConfirm
}: DisableUserDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disable User Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to disable the account for {user.name} (
            {user.email})? This will prevent the user from accessing the system.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Disable Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
