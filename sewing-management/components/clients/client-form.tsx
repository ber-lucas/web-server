'use client';

import type React from 'react';
import { useState } from 'react';
import { DialogForm } from '@/components/ui/dialog-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ClientFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (client: { name: string; contact: string; address: string }) => void
  isSubmitting?: boolean
}

export function ClientForm({ isOpen, onClose, onSubmit, isSubmitting = false }: ClientFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "contact") {
      // Formatar o telefone no formato brasileiro (XX) XXXXX-XXXX
      const numericValue = value.replace(/\D/g, "")
      let formattedValue = ""

      if (numericValue.length <= 2) {
        formattedValue = numericValue
      } else if (numericValue.length <= 7) {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`
      } else {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`
      }

      setFormData((prev) => ({ ...prev, [name]: formattedValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Remover formatação do telefone antes de enviar para o backend
    const contactNumeric = formData.contact.replace(/\D/g, "")

    onSubmit({
      name: formData.name,
      contact: contactNumeric,
      address: formData.address,
    })
  }

  return (
    <DialogForm
      title="Adicionar Novo Cliente"
      description="Preencha as informações do cliente abaixo."
      isOpen={isOpen}
      onClose={() => {
        setFormData({ name: "", contact: "", address: "" })
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
          <Label htmlFor="contact">Contato</Label>
          <Input
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="(XX) XXXXX-XXXX"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
      </div>
    </DialogForm>
  )
}

