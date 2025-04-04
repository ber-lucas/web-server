"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { type Garment, garmentApi } from "@/lib/api"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { GarmentForm } from "./garment-form"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useToast } from "@/hooks/use-toast"

export default function GarmentsView() {
  const [garments, setGarments] = useState<Garment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const fetchGarments = async () => {
    try {
      setIsLoading(true)
      const data = await garmentApi.findAll()
      setGarments(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch garments",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGarments()
  }, [])

  const handleCreateGarment = async (garment: Omit<Garment, "id">) => {
    try {
      setIsSubmitting(true)
      const result = await garmentApi.create(garment)
      if (result.isCreated) {
        toast({
          title: "Success",
          description: "Garment created successfully",
        })
        setIsCreateDialogOpen(false)
        fetchGarments()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create garment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteGarment = async () => {
    if (!selectedGarment) return

    try {
      setIsSubmitting(true)
      const result = await garmentApi.delete(selectedGarment.id)
      if (result.isDeleted) {
        toast({
          title: "Success",
          description: "Garment deleted successfully",
        })
        setIsDeleteDialogOpen(false)
        fetchGarments()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete garment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    { key: "name", title: "Name" },
    { key: "type", title: "Type" },
    {
      key: "value",
      title: "Value",
      render: (garment: Garment) => `$${garment.value.toFixed(2)}`,
    },
    {
      key: "actions",
      title: "Actions",
      render: (garment: Garment) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedGarment(garment)
            setIsDeleteDialogOpen(true)
          }}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Garments</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Garment
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      ) : (
        <DataTable data={garments} columns={columns} searchField="name" />
      )}

      <GarmentForm
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateGarment}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        title="Delete Garment"
        description={`Are you sure you want to delete ${selectedGarment?.name}? This action cannot be undone.`}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteGarment}
        isConfirming={isSubmitting}
      />
    </div>
  )
}

