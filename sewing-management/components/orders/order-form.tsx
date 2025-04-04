"use client"

import type React from "react"

import { useState } from "react"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Client, Garment } from "@/lib/api"
import { Plus, Trash2 } from "lucide-react"

interface OrderFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (order: {
    clientId: string
    date?: Date
    garments: { garmentId: string; amount: number; value: number }[]
  }) => void
  clients: Client[]
  garments: Garment[]
  isSubmitting?: boolean
}

export function OrderForm({ isOpen, onClose, onSubmit, clients, garments, isSubmitting = false }: OrderFormProps) {
  const [clientId, setClientId] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [orderItems, setOrderItems] = useState<
    {
      id: string
      garmentId: string
      amount: number
      value: number
    }[]
  >([])

  const resetForm = () => {
    setClientId("")
    setDate(new Date().toISOString().split("T")[0])
    setOrderItems([])
  }

  const handleAddItem = () => {
    if (garments.length === 0) return

    const firstGarment = garments[0]
    setOrderItems([
      ...orderItems,
      {
        id: crypto.randomUUID(),
        garmentId: firstGarment.id,
        amount: 1,
        value: firstGarment.value,
      },
    ])
  }

  const handleRemoveItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id))
  }

  const handleItemChange = (id: string, field: "garmentId" | "amount" | "value", value: string | number) => {
    setOrderItems(
      orderItems.map((item) => {
        if (item.id === id) {
          if (field === "garmentId") {
            const selectedGarment = garments.find((g) => g.id === value)
            return {
              ...item,
              [field]: value,
              value: selectedGarment ? selectedGarment.value : item.value,
            }
          }
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientId || orderItems.length === 0) {
      return
    }

    onSubmit({
      clientId,
      date: date ? new Date(date) : undefined,
      garments: orderItems.map(({ garmentId, amount, value }) => ({
        garmentId,
        amount,
        value,
      })),
    })
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.amount * item.value, 0)
  }

  return (
    <DialogForm
      title="Create New Order"
      description="Fill in the order details below."
      isOpen={isOpen}
      onClose={() => {
        resetForm()
        onClose()
      }}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Create Order"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client">Client</Label>
          <Select value={clientId} onValueChange={setClientId}>
            <SelectTrigger id="client">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Garments</Label>
            <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>

          {orderItems.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No items added. Click "Add Item" to add garments to this order.
            </div>
          ) : (
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-end gap-2 p-3 border rounded-md bg-muted/30">
                  <div className="flex-1">
                    <Label htmlFor={`garment-${item.id}`} className="text-xs">
                      Garment
                    </Label>
                    <Select
                      value={item.garmentId}
                      onValueChange={(value) => handleItemChange(item.id, "garmentId", value)}
                    >
                      <SelectTrigger id={`garment-${item.id}`}>
                        <SelectValue placeholder="Select a garment" />
                      </SelectTrigger>
                      <SelectContent>
                        {garments.map((garment) => (
                          <SelectItem key={garment.id} value={garment.id}>
                            {garment.name} - ${garment.value.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-20">
                    <Label htmlFor={`amount-${item.id}`} className="text-xs">
                      Amount
                    </Label>
                    <Input
                      id={`amount-${item.id}`}
                      type="number"
                      min="1"
                      value={item.amount}
                      onChange={(e) => handleItemChange(item.id, "amount", Number.parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <div className="w-24">
                    <Label htmlFor={`value-${item.id}`} className="text-xs">
                      Value
                    </Label>
                    <Input
                      id={`value-${item.id}`}
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.value}
                      onChange={(e) => handleItemChange(item.id, "value", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <div className="text-sm font-medium">Total: ${calculateTotal().toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DialogForm>
  )
}

