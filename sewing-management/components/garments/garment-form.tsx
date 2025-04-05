'use client';

import type React from 'react';
import { useState } from 'react';
import { DialogForm } from '@/components/ui/dialog-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface GarmentFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (garment: { name: string; type: string; value: number }) => void
  isSubmitting?: boolean
}

export function GarmentForm({ isOpen, onClose, onSubmit, isSubmitting = false }: GarmentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      type: formData.type,
      value: Number.parseFloat(formData.value),
    })
  }

  return (
    <DialogForm
      title="Adicionar Nova Peça"
      description="Preencha as informações da peça abaixo."
      isOpen={isOpen}
      onClose={() => {
        setFormData({ name: "", type: "", value: "" })
        onClose()
      }}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Input id="type" name="type" value={formData.type} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Valor</Label>
          <Input
            id="value"
            name="value"
            type="number"
            step="0.01"
            min="0"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </DialogForm>
  )
}

