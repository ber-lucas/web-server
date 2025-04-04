"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { type Client, clientApi } from "@/lib/api"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { ClientForm } from "./client-form"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useToast } from "@/hooks/use-toast"

export default function ClientsView() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const fetchClients = async () => {
    try {
      setIsLoading(true)
      const data = await clientApi.findAll()
      setClients(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch clients",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleCreateClient = async (client: Omit<Client, "id">) => {
    try {
      setIsSubmitting(true)
      const result = await clientApi.create(client)
      if (result.isCreated) {
        toast({
          title: "Success",
          description: "Client created successfully",
        })
        setIsCreateDialogOpen(false)
        fetchClients()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create client",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClient = async () => {
    if (!selectedClient) return

    try {
      setIsSubmitting(true)
      const result = await clientApi.delete(selectedClient.id)
      if (result.isDelete) {
        toast({
          title: "Success",
          description: "Client deleted successfully",
        })
        setIsDeleteDialogOpen(false)
        fetchClients()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete client",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    { key: "name", title: "Name" },
    { key: "contact", title: "Contact" },
    { key: "address", title: "Address" },
    {
      key: "actions",
      title: "Actions",
      render: (client: Client) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedClient(client)
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
        <h2 className="text-2xl font-semibold">Clients</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      ) : (
        <DataTable data={clients} columns={columns} searchField="name" />
      )}

      <ClientForm
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateClient}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        title="Delete Client"
        description={`Are you sure you want to delete ${selectedClient?.name}? This action cannot be undone.`}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteClient}
        isConfirming={isSubmitting}
      />
    </div>
  )
}

