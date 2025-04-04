"use client"

import type React from "react"

import { useState } from "react"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <DialogForm
      title="Add New Client"
      description="Enter the client's information below."
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
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Contact</Label>
          <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
      </div>
    </DialogForm>
  )
}

