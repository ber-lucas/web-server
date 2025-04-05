'use client';

import type React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DialogFormProps {
  title: string
  description?: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  children: ReactNode
  submitLabel?: string
  isSubmitting?: boolean
}

export function DialogForm({
                             title,
                             description,
                             isOpen,
                             onClose,
                             onSubmit,
                             children,
                             submitLabel = "Salvar",
                             isSubmitting = false,
                           }: DialogFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div className="py-4 space-y-4">{children}</div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

